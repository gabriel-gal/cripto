"use client"
import CardCripto from "@/components/CardCripto";
import ListaCripto from "@/components/ListaCripto";
import CriptoProvider from "@/contexts/CriptoContext";


export default function Home() {
    return (
        <div className="h-screen py-8 px-4 gap-8 grid lg:grid-cols-[38rem_1fr] grid-cols-1">
            <CriptoProvider>
                <ListaCripto />
                <CardCripto />
            </CriptoProvider>          
        </div>
    );
}