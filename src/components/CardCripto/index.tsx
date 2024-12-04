import { useCripto } from "@/contexts/CriptoContext";
import { Cripto } from "@/@types/types";
import Grafico from "./Grafico";

export default function CardCripto() {

    const { cripto } = useCripto()
    const data: Cripto | undefined = cripto?.[0]

    return (
        <div>
            <header className="flex items-center justify-between gap-3 text-white mb-2">
                {data ? (
                    <div className="flex items-center gap-1 md:gap-3">
                        <img
                            className="w-10 h-10 md:w-20 md:h-20 rounded-full"
                            src={data?.image}
                            alt={`Logo da Cripto ${data?.name}`}
                        />
                        <p className="text-xl lg:text-3xl">{data?.name}</p>
                        <p className="text-lg lg:text-2xl">({data?.symbol})</p>

                    </div>
                ) : (
                    <div className="flex items-center gap-1 md:gap-3">
                        <div className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-gray-200 animate-pulse"></div>
                        <p className="text-xl lg:text-3xl text-gray-500 animate-pulse">Carregando...</p>
                    </div>
                )}
                <div>
                    <p className="text-lg md:text-lg lg:text-2xl xl:text-3xl">

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