import { Cripto } from "@/@types/types";
import { useCripto } from "@/contexts/CriptoContext";
import Component from "./teste";

export default function CardCripto() {

    const { cripto } = useCripto()
    const data: Cripto | undefined = cripto?.[0]


    console.log(data?.id)

    return (
        <div>
            <header className="flex items-center gap-3 text-white mb-2">
                <img className="w-20 h-20 rounded-full" src={data?.image} />
                <p className="text-3xl">{data?.name}</p>
                <p className="text-2xl">({data?.symbol})</p>
            </header>
            <Component test={data?.id}/>
        </div>
    )
}