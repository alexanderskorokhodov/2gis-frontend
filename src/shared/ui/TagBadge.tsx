// src/shared/ui/TagBadge.tsx
import { HTMLAttributes } from "react"

type Props = {
	label: string
} & HTMLAttributes<HTMLDivElement>

export function TagBadge({ label, className = "", ...rest }: Props) {
	return (
		<div
			className={
				"inline-flex w-fit items-center justify-center " +
				"rounded-[6px] bg-[#FFF4E4] text-[#EA8D0B] " +
				"px-[10px] py-[4px] " +
				"text-[10px] leading-[1.223] font-medium font-[var(--main-font)] " +
				className
			}
			{...rest}
		>
			{label}
		</div>
	)
}