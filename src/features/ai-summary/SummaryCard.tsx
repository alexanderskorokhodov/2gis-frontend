import React, { useEffect } from "react";
import { DevelopersCarousel } from "@widgets/developers/Carousel";
import { useUnit } from "effector-react";
import { $popular, popularRequested } from "@entities/developer/model";

// Unified mockup-friendly props based on:
// title / image / heading1 / listpositives / markedlist / info(headings+description) / developer name / other projects list

type Props = {
	title: string;
	image: string;
	heading1: string; // e.g. "С 2018, 13 свободных квартир"
	listPositives: string[]; // badges that people praise
	markedList?: string[]; // badges that people just "отмечают"
	info: { heading: string; description: string }[]; // AI summary blocks
	developer: string; // developer name
	otherProjects?: { title: string; image: string; tags?: string[]; rating?: number }[]; // developer projects
};

export default function SummaryCard({
	                                    title,
	                                    image,
	                                    heading1,
	                                    listPositives,
	                                    markedList,
	                                    info,
	                                    developer,
	                                    otherProjects,
                                    }: Props) {

	const popular = useUnit($popular);

	useEffect(() => {
		popularRequested();
	}, []);

	return (
		<div className="w-full p-[20px] pb-0 text-[15px] text-gray-900">
			{/* Cover */ }
			<div className="relative rounded-[10px] overflow-hidden">
				<img src={ image } alt={ title } className="w-full h-48 object-cover"/>
				{/* затемнение */ }
				<div className="absolute inset-0 bg-black/20"/>
				<div className="primary-font absolute bottom-[55px] left-3 text-white text-[14px] font-medium">
					Жилой комплекс
				</div>
				<div
					className="primary-font absolute bottom-[0px] left-[15px] text-[42px] font-semibold text-white drop-shadow-lg">
					{ title }
				</div>
			</div>

			{/* Body */ }
			<div className="mt-[20px] text-gray-800 flex-col gap-[20px]">
				{/* Heading line under title */ }
				<div className="text-[22px] font-normal primary-font ">{ heading1 }</div>

				{/* Positives */ }
				{ listPositives?.length ? (
					<>
						<h3 className="mt-3 text-[16px] font-semibold primary-font ">Люди ценят/хвалят</h3>
						<div className="flex flex-wrap gap-2 mt-2">
							{ listPositives.map((tag) => (
								<span
									key={ tag }
									className="bg-gray-200 text-gray-800 rounded-xl px-3 py-1 text-[14px] primary-font"
								>
                    { tag }
                  </span>
							)) }
						</div>
					</>
				) : null }

				{/* Marked issues/features */ }
				{ markedList?.length ? (
					<>
						<h3 className="mt-[20px] text-[16px] font-semibold primary-font">Люди отмечают</h3>
						<div className="flex flex-wrap gap-2 mt-2">
							{ markedList.map((tag) => (
								<span
									key={ tag }
									className="bg-gray-200 text-gray-800 rounded-xl px-3 py-1 text-[14px] primary-font"
								>
                    { tag }
                  </span>
							)) }
						</div>
					</>
				) : null }

				{/* AI Summary list */ }
				{ info?.length ? (
					<>
						<h3 className="mt-[20px] text-[16px] font-semibold primary-font">Что говорят жители? AI‑сводка.</h3>
						<ul className="list-none space-y-2 mt-2">
							{ info.map((s) => (
								<li key={ s.heading }>
									<span
										className="text-[#308414] font-semibold text-[14px] ml-[2px] indent-[-0.4px]"> • { "  " + s.heading }</span>
									<br/> { s.description }
								</li>
							)) }
						</ul>
					</>
				) : null }

				{/* Developer */ }
				<div className="mt-6 text-[22px]">Застройщик { developer }</div>
				<DevelopersCarousel heading={ "Другие проекты застройщика" } className={ "px-0px" } items={ popular }
				                    onOpenAll={ () => {
				                    } }/>
			</div>
		</div>
	);
}