'use client'
import { LINKS } from "../utils.ts";
import type { ImageMetadata } from "astro";
import { useCallback, useState, type PropsWithChildren, type ReactNode } from 'react'
import { CloseButton, Dialog, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import { button } from "./button.astro"
type EmblaCarousel = ReturnType<typeof useEmblaCarousel>
type EmblaViewportRefType = EmblaCarousel[0]
type EmblaCarouselType = EmblaCarousel[1]

import service1 from "../assets/services-1.avif";
import service2 from "../assets/services-2.avif";
import service3 from "../assets/services-3.avif";
import service4 from "../assets/services-4.avif";
import service5 from "../assets/services-5.avif";
import service6 from "../assets/services-6.avif";
import service7 from "../assets/services-7.avif";
import { cx } from "cva";

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
	const [emblaRef1, emblaApi1] = useEmblaCarousel(
		{ loop: true, align: "center", dragFree: false },
		[Autoplay({ playOnInit: true, delay: 6000 })]

	)
	const [emblaRef2, emblaApi2] = useEmblaCarousel(
		{ loop: true, align: "center", dragFree: false },
		[Autoplay({ playOnInit: true, delay: 6000 })]

	)
	let [isOpen, setIsOpen] = useState(false)
	const [currentSlides, setCurrentSlides] = useState<{ title: string; images: ImageMetadata[] }>({ title: "", images: [] })


	const handleOpen = useCallback(() => {
		setIsOpen(true)
	}, [])
	const handleClose = useCallback(() => {
		setIsOpen(false)
	}, [])

	const goToSlide = (idx: number) => {
		if (emblaApi2) {
			emblaApi2.scrollTo(idx)
			return
		}
		console.warn(`cannot scroll to ${idx}. Embla api doesn't exist!`)
	}

	const handleExpandImage = useCallback(({ idx, ...currentSlide }: { title: string; images: ImageMetadata[]; idx: number }) => {
		setCurrentSlides(currentSlide)
		handleOpen()
		goToSlide(idx)
	}, [currentSlides])



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
							<Slider emblaRef={emblaRef1} emblaApi={emblaApi1} className="lg:h-96">
								{images.map((img, idx) => (
									<Slide key={idx}>
										<button type="button" onClick={() => handleExpandImage({ title, images, idx })} className="w-full">
											<SlideImage src={img.src} title={title} className="lg:h-96" />
										</button>
									</Slide>
								))}
							</Slider>
							<h3 className='font-semibold text-2xl mt-4'>{title}</h3>
							<p className='mt-2 mb-3 max-w-prose'>{description}</p>
							<a target="_blank" href={`${LINKS.whatsapp}?text=${encodeURIComponent(`Buenas Tardes me gustaría agendar una cita de ${title}`)}`} className={button({ style: "secondary", className: "w-fit" })}>Agendar cita</a>
						</TabPanel>
					))}
				</TabPanels>
			</TabGroup>

			<Dialog unmount={false} open={isOpen} onClose={handleClose}>
				<div className="fixed inset-0 flex w-screen items-center justify-center before:w-screen before:h-screen before:bg-stone-950/90 before:fixed z-50">
					<DialogPanel className="max-w-[90vw] bg-stone-100 p-6 z-10 rounded-xl flex flex-col gap-y-10">
						<CloseButton
							className="w-8 aspect-square text-stone-950 self-end"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 aspect-square"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
						</CloseButton>
						<Slider className="h-[80vh]" emblaApi={emblaApi2} emblaRef={emblaRef2}>
							{currentSlides.images.map((img, idx) => (
								<Slide key={idx} >
									<SlideImage className="h-full" src={img.src} title={currentSlides.title} />
								</Slide>
							))}
						</Slider>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	)
}

const Slider = ({ children, className, emblaRef, emblaApi }: {
	children: ReactNode
	className?: string
	emblaApi: EmblaCarouselType
	emblaRef: EmblaViewportRefType
}) => {

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	return (
		<div className="w-full relative">
			<button type="button" onClick={scrollPrev} className='h-full w-[12%] flex items-center justify-start absolute inset-y-0 left-0 bg-gradient-to-r from-stone-950/80 to-transparent z-10 pl-4'>
				<div className="w-10 aspect-square grid place-items-center rounded-full bg-stone-100 text-stone-950">

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
				</div>
			</button>
			<button type="button" onClick={scrollNext} className='h-full w-[12%] absolute inset-y-0 right-0 bg-gradient-to-l from-stone-950/80 to-transparent z-10 pr-4 flex items-center justify-end'>
				<div className="w-10 aspect-square grid place-items-center rounded-full bg-stone-100 text-stone-950">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5" stroke="currentColor"
						className='w-8 aspect-square'
					><path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg
					>
				</div>
			</button>
			<div className={cx("relative overflow-hidden", className)} ref={emblaRef}>
				<div className="flex w-full rounded-xl h-full" >
					{children}
				</div>
			</div>
		</div>
	)
}


const Slide = ({ children }: PropsWithChildren) => (
	<div className="flex-grow-0 flex-shrink-0 w-full lg:basis-[70%] min-w-0 mr-4 rounded-xl" >
		{children}
	</div>
)

const SlideImage = ({ src, title, className }: { src: string; title: string, className?: string }) => (
	<img src={src} alt={`Referencia de ${title}`} className={cx('w-full rounded-xl object-cover mr-4', className)} />
)
