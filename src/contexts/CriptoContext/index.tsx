"use client"
import { Cripto } from "@/@types/types";
import { getCripto, getAllCripto } from "@/controllers/Cripto";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ICriptoProps {
    buscarAllCripto: () => Promise<void>;
    buscarCripto: (id: string) => Promise<void>;
    allCripto?: Cripto[];
    cripto?: Cripto[];
}

const CriptoContext = createContext<ICriptoProps>({} as ICriptoProps)

export default function CriptoProvider({ children }: PropsWithChildren) {

    const [allCripto, setAllCripto] = useState<Cripto[] | undefined>([])
    const [cripto, setCripto] = useState<Cripto[] | undefined>([])

    const buscarAllCripto = async () => {
        const resp = await getAllCripto()
        setAllCripto(resp)
    }

    const buscarCripto = async (id: string) => {
        const resp = await getCripto(id)
        setCripto(resp)
    }

    return (
        <CriptoContext.Provider value={{ allCripto, cripto, buscarAllCripto, buscarCripto }}>
            {children}
        </CriptoContext.Provider>
    )
}

export const useCripto = () => useContext(CriptoContext)