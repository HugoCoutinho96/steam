'use client'

import Image from "next/image"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'

interface Games{
    id: number,
    name: string,
    image: string,
    screenshots: string[],
    preco: {
        currency: string
        initial: number
        final: number
        discount_percent: number
        initial_formatted: string
        final_formatted: string
    } | null,
    tags: string[],
    added: number,
    rating: number
}

export default function Destaques(){
    const [games, setGames] = useState<Games[]>([])

    useEffect(() => {
    async function fetchGames() {
        const baseUrl = "https://api.rawg.io/api";
        const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

        const response = await fetch(`${baseUrl}/games?key=${apiKey}&ordering=-rating&page=1&page_size=15`);
        const data = await response.json();
        console.log(data.results)

        const gamesData = await Promise.all(data.results.map(async (game: any) => {
        const res = await fetch(`${baseUrl}/games/${game.id}/stores?key=${apiKey}`);
        const storeData = await res.json();

        const steamResult = storeData.results.find((result: any) => result.store_id === 1);

        if (steamResult) {
            const match = steamResult.url.match(/\/app\/(\d+)/);
            const steamId = match ? match[1] : null;

            if (steamId) {
            const resPreco = await fetch(`/api/${steamId}`);
            const preco = await resPreco.json();
            const precoFinal = preco[steamId]?.data?.price_overview || null;

            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                screenshots: game.short_screenshots.map((data: any) => data.image),
                preco: precoFinal,
                tags: game.tags.map((tag: any) => tag.name),
                added: game.added,
                rating: game.rating
            };
            }
        }

        return null;
        }));

        const validGames = gamesData.filter((game) => game !== null);
        console.log(validGames)
        setGames(validGames);
    }

    fetchGames();
    }, []);

    return(
        <div className="relative w-full max-w-5xl mx-auto shadow mt-3">
            <button className="swiper-button-prev -ml-9 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 shadow">
                <CaretLeft size={32} />
            </button>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
            >
            {games.map(game => (
                <SwiperSlide key={game.id}>
                    <div className='flex' >
                        <Image
                            width={694}
                            height={400}
                            src={game.image}
                            alt={`Slide do game ${game.name}`}
                            className="h-64 shadow-2xl"
                        />
                        <div className="flex flex-col px-3 pt-5 pb-3 destaque_description w-1/3 font-['Motiva_Sans']">
                            <span className='font-light text-[24px] leading-[28px]'>{game.name}</span>
                            <div className='flex flex-col mt-3'>
                                <span className='font-extralight text-[21px] leading-[18px]'>Já disponível</span>
                                {game.added > 1000 && game.rating > 4 ?
                                <span className='px-1 py-0.5 mt-2 max-w-12 bg-[#384148] font-normal text-[11px] leading-[19px]'>Popular</span> : null}
                            </div>
                            {game.preco!.discount_percent > 0 ? 
                                <div className="inline-flex gap-1 p-0.5 items-center font-['Arial'] bg-[#324656] max-w-max mt-auto">
                                    <span className="bg-[var(--background-promotion)] p-0.5 text-[var(--text-promotion)] font-medium text-[12px] leading-[15px] font-['Motiva_Sans']">{`-${game.preco?.discount_percent}%`}</span>
                                    <span className="font-normal text-[11px] leading-[12px]  relative preco_antigo text-[#738895]">{game.preco?.initial_formatted}</span>
                                    <span className="font-normal text-[11px] leading-[12px] p-0.5 text-[var(--text-promotion)]">{game.preco?.final_formatted}</span>
                                </div>
                                : 
                                <div className="inline-flex items-center font-['Arial'] max-w-max mt-auto">
                                    <span className="font-normal text-[11px] leading-[12px] text-white">{game.preco?.final_formatted}</span>
                                </div>}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            </Swiper>

            <button className="swiper-button-next -mr-9 absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black p-2 shadow">
                <CaretRight size={32} />
            </button>

            <div className="swiper-pagination absolute text-center"></div>
        </div>
    )
}