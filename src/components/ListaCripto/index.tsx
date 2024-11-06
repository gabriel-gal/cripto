import { useCripto } from "@/contexts/CriptoContext";
import ItemCripto from "./item-cripto";
import { useEffect } from "react";

export default function ListaCripto() {

    const { allCripto, buscarAllCripto, buscarCripto } = useCripto()

    useEffect(() => {
        buscarAllCripto()
        buscarCripto("bitcoin")
    }, [])

    return (
        <div className="grid content-start gap-2 overflow-y-auto scrollbar-thumb-gray-200 p-3 bg-slate-100 text-slate-950 rounded-3xl">
            <div className="font-extrabold py-1 pr-0 pl-3 border-b-2 border-b-black"
                style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1fr 1fr 1fr' }}>
                <span></span>
                <span>Nome</span>
                <span>Preço</span>
                <span><span className="text-green-700 text-lg font-black">&uarr;</span> 24h</span>
                <span><span className="text-red-700 text-lg font-black">&darr;</span>  24h</span>
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