import Image from "next/image";
import logoImg from "@/../public/images/logo_steam.svg"
import Link from "next/link";
import { CaretDown } from "phosphor-react";

export default function Header(){
    return(
        <div className="flex gap-3 max-h-[103px] max-w-[941px] h-[103px] w-full">
            <div className="flex gap-9">
                <div className="flex items-center">
                    <Link href="/">
                        <Image src={logoImg} alt="logo da steam" width={176} height={44}/>
                    </Link>
                </div>    
                <div className="flex items-center gap-3 font-['Motiva_Sans'] font-medium text-base leading-4 menu-opcoes-borda">
                    <Link href={""} className="active">LOJA</Link>
                    <Link href={""}>COMUNIDADE</Link>
                    <Link href={""}>SOBRE</Link>
                    <Link href={""}>SUPORTE</Link>
                </div>
            </div>
            <div className="ml-auto pt-1 text-[#b8b6b4] leading-6">
                <Link href={""} className="text-[#b8b6b4] hover:text-white font-['Motiva_Sans'] font-normal text-[11px]">
                    iniciar sessão
                </Link>
                <span className="text-[12px] mx-1">|</span>
                <Link href={""} className="hover:text-white font-['Motiva_Sans'] font-normal text-[11px]">
                    <span>idioma</span>
                </Link>
            </div>
        </div>
    )
}