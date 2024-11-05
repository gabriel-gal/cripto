import ItemCripto from "./item-cripto";
import { useEffect } from "react";
import { useCripto } from "@/contexts/CriptoContext";

export default function ListaCripto() {

    const { allCripto, buscarAllCripto } = useCripto()

    useEffect(() => {
        buscarAllCripto()
    }, [])

    return (
        <div className="grid content-start gap-2 overflow-y-auto p-3 bg-slate-100 text-slate-950 rounded-3xl">
            <div className="font-extrabold py-1 pr-0 pl-3 border-b-2 border-b-black"
                style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1fr 1fr 1fr' }}>
                <span></span>
                <span>Nome</span>
                <span>Preço</span>
                <span>Alta 24h</span>
                <span>Baixa 24h</span>
            </div>

            {allCripto?.map((produto) => (
                <ItemCripto
                    key={produto.id}
                    id={produto.id}
                    name={produto.name}
                    image={produto.image}
                    price={produto.current_price}
                    high_24h={produto.high_24h}
                    low_24h={produto.low_24h}
                />
            ))}
        </div>
    )
}