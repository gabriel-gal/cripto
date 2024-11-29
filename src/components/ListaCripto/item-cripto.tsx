import { useCripto } from "@/contexts/CriptoContext";

interface ICardCripto {
    id: string,
    name: string,
    image: string,
    price: number,
    high_24h: number,
    low_24h: number,
}

export default function ItemCripto(props: ICardCripto) {

    const { buscarCripto } = useCripto()
    const handleClick = async () => { await buscarCripto(props.id); };

    return (
        <div
            className="py-1 pr-0 pl-3 items-center cursor-pointer border-b-2 border-b-slate-300 
        grid grid-cols-[30px_1fr_1fr_1fr_1fr] md:grid-cols-[50px_1fr_1fr_1fr_1fr] text-xs md:text-base"
            onClick={handleClick}
        >
            <img className="h-5 w-5 md:w-8 md:h-8 rounded-md" src={props.image} alt={props.name} />
            <span>{props.name}</span>
            <span>R$ {props.price.toLocaleString("pt-BR")}</span>
            <span>R$ {props.high_24h.toLocaleString("pt-BR")}</span>
            <span className="">R$ {props.low_24h.toLocaleString("pt-BR")}</span>
        </div>
    );
}
