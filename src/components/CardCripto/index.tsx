import { useCripto } from "@/contexts/CriptoContext";
import { Cripto } from "@/@types/types";
import Grafico from "./Grafico";

export default function CardCripto() {

    const { cripto } = useCripto()
    const data: Cripto | undefined = cripto?.[0]

    return (
        <div>
            <header className="flex items-center justify-between gap-3 text-white mb-2">
                <div className="flex items-center gap-3">
                    <img className="w-20 h-20 rounded-full" src={data?.image} />
                    <p className="text-3xl">{data?.name}</p>
                    <p className="text-2xl">({data?.symbol})</p>
                </div>
                <div>
                    <p className="text-3xl">
                        {data?.current_price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </p>
                </div>
            </header>
            <Grafico id={data?.id} />
        </div>
    )
}