import { cn } from '@/lib/utils'
import { Logomark } from './Logomark'

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-2xl font-semibold tracking-[-0.04em] text-foreground',
        className,
      )}
    >
      <Logomark className="h-6 w-6 text-foreground" />
      <span>
        ecniv<span className="text-accent">s</span>
      </span>
    </span>
  )
}
