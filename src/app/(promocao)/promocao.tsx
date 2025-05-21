'use client'
import { MagnifyingGlass } from "phosphor-react";
import promocaoImg from "@/../public/images/promocaoImg.jpg"
import Image from "next/image";

export default function Promocao(){
    return (
        <div className="flex justify-center bg-[#3a6d9c] h-[452px] w-full relative overflow-hidden">
            <Image src={promocaoImg} alt="imagem da promocao" className="object-cover" priority/>
            <div className="flex gap-28 absolute z-10 mt-16 shadow" style={{backgroundImage: `linear-gradient(to right, #4c719b 20%, #5a8ab880 40%, #264184 55%)`}}>
                <div className="flex items-center menu-opcoes">
                    <ul className="flex gap-1 items-center">
                        <li>Sua loja</li>
                        <li>Categoria</li>
                        <li>Notícias</li>
                    </ul>
                </div>
                <div className="flex bg-[#316281] pl-4 py-0.5 pr-0.5 my-1 mr-1 shadow rounded-[3px]">
                    <input type="text" placeholder="buscar"
                        className="border-0 bg-transparent outline-0 placeholder:text-[#0e1c25] placeholder:italic"/>
                    <span className="bg-[#55a0cc] hover:bg-[#64b6e6] transition-colors p-1 text-zinc-800">
                        <MagnifyingGlass size={18} />
                    </span>
                </div>
            </div>
        </div>
    )
}