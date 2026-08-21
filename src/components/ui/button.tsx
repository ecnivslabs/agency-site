import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        solid:
          'bg-accent text-accent-foreground shadow-[0_1px_0_hsl(var(--accent-highlight)/0.4)_inset,0_8px_20px_-8px_hsl(var(--accent)/0.55)] hover:bg-accent/90 hover:shadow-[0_1px_0_hsl(var(--accent-highlight)/0.4)_inset,0_12px_28px_-8px_hsl(var(--accent)/0.7)]',
        ghost:
          'border border-border text-foreground hover:border-accent/50 hover:bg-surface',
        link: 'text-foreground underline-offset-4 hover:text-accent',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
