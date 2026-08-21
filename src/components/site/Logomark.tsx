import { useId } from 'react'
import { cn } from '@/lib/utils'

export function Logomark({ className }: { className?: string }) {
  const id = useId()
  const arcId = `${id}-arc`

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn('h-7 w-7', className)}
    >
      <path
        id={arcId}
        d="M 4.892 8.777 A 6.5 6.5 0 0 1 17.108 13.223"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <use
        href={`#${arcId}`}
        transform="rotate(180 16 16)"
        stroke="currentColor"
      />
    </svg>
  )
}
