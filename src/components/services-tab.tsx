'use client'
import { LINKS } from "../utils.ts";
import { useCallback } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import { button } from "./button.astro"

import service1 from "../assets/services-1.avif";
import service2 from "../assets/services-2.avif";
import service3 from "../assets/services-3.avif";
import service4 from "../assets/services-4.avif";
import service5 from "../assets/services-5.avif";
import service6 from "../assets/services-6.avif";
import service7 from "../assets/services-7.avif";

const categories = [
	{
		images: [service1, service2, service1],
		name: "rectificacion-bloque",
		title: "Rectificación de bloque",
		description:
			"Reparación de los bloques del motor para asegurar que estén perfectamente lisos y aptos para un rendimiento óptimo",
	},
	{
		images: [service3, service4, service5],
		name: "rectificación-de-cigueñales",
		title: "Rectificación de cigüeñales",
		description:
			"Renovación de cigüeñales, un componente crucial del motor, para que funcionen como nuevos",
	},
	{
		images: [service6, service7, service6],
		name: "torno",
		title: "Torno",
		description:
			"Maquinado de precisión para dar forma o afinar piezas del motor para un mejor ajuste y funcionamiento.",
	},
]


export default function ServicesTab() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ playOnInit: true, delay: 6000 })])

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])


	return (
		<>
			<TabGroup>
				<TabList className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
					{categories.map(({ title, images }, idx) => (
						<Tab
							key={idx}
							className="flex items-center gap-x-2 font-semibold p-2 border rounded-xl border-stone-950 data-[selected]:bg-stone-950 data-[selected]:text-stone-100 transition-colors"
						>
							<img src={images[0].src} alt={`Referencia de ${title}`} className='aspect-video h-16 rounded-xl object-cover' />
							<span>
								{title}
							</span>
						</Tab>
					))}
				</TabList>
				<TabPanels className="mt-12">
					{categories.map(({ images, title, description, name }) => (
						<TabPanel key={name}>
							<div className="w-full relative">
								<PrevSlideButton onClick={scrollPrev} />
								<NextSlideButton onClick={scrollNext} />
								<div className="relative overflow-hidden after:h-full after:w-[12%] after:inline-block after:absolute after:inset-y-0 after:right-0 after:bg-gradient-to-l after:from-stone-950/80 after:to-transparent before:h-full before:w-[12%] before:inline-block before:absolute before:inset-y-0 before:left-0 before:bg-gradient-to-r before:from-stone-950/80 before:to-transparent embla before:z-40 after:z-40 after:pointer-events-none before:pointer-events-none after:rounded-br-xl after:rounded-tr-xl before:rounded-bl-xl before:rounded-tl-xl lg:h-[484px]" ref={emblaRef}>
									<div className="flex w-full rounded-xl" >
										{images.map((img, idx) => (
											<div className="flex-grow-0 flex-shrink-0 w-full lg:basis-[70%] min-w-0 mr-4 rounded-xl" key={idx}>
												<img src={img.src} alt={`Referencia de ${title}`} className='w-full rounded-xl object-cover mr-4 h-96 lg:h-[484px]' />
											</div>
										))}
									</div>
								</div>
							</div>
							<h3 className='font-semibold text-2xl mt-4'>{title}</h3>
							<p className='mt-2 mb-3 max-w-prose'>{description}</p>
							<a target="_blank" href={`${LINKS.whatsapp}?text=${encodeURIComponent(`Buenas Tardes me gustaría agendar una cita de ${title}`)}`} className={button({ style: "secondary", className: "w-fit" })}>Agendar cita</a>
						</TabPanel>
					))}
				</TabPanels>
			</TabGroup>
		</>
	)
}

const PrevSlideButton = ({ onClick }: { onClick: () => void }) => (
	<button type="button" onClick={onClick} className='absolute inset-y-0 my-auto h-fit left-4 w-10 aspect-square grid place-items-center rounded-full z-50 bg-stone-100'>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className='w-6 aspect-square'
		><path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg
		>
	</button>
)
const NextSlideButton = ({ onClick }: { onClick: () => void }) => (
	<button type="button" onClick={onClick} className='absolute inset-y-0 my-auto h-fit right-4 w-10 aspect-square grid place-items-center rounded-full z-50 bg-stone-100'>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className='w-8 aspect-square'
		><path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg
		>
	</button>
)
