import { Check, X } from '@phosphor-icons/react'
import { Logomark } from './Logomark'
import { Reveal } from './Reveal'

const NOT_THIS = [
  'Hourly freelancing',
  'Staff augmentation',
  'Open-ended consulting',
  'A retainer agency',
  'A SaaS product company',
]

const THIS = [
  'A fixed scope, agreed before work starts',
  'A fixed set of deliverables, written down',
  'One team executing the project end to end',
  'A delivered, running system, not a report',
]

export function Positioning() {
  return (
    <section className="border-t border-border/60 py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            The difference
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            We are not a staffing pool. We are a delivery team.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/30 bg-background shadow-[0_0_0_6px_hsl(var(--background)),0_20px_44px_-20px_rgba(0,0,0,0.85)] md:flex"
          >
            <Logomark className="h-5 w-5 text-accent" />
          </div>
          <div className="rounded-2xl bg-gradient-to-b from-border/80 via-border/30 to-border/80 p-px shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <div className="grid grid-cols-1 divide-y divide-border/50 overflow-hidden rounded-2xl bg-background md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-8 md:p-12">
                <p className="font-mono-brand text-xs tracking-[0.2em] text-subtle-foreground/70 uppercase">
                  Not this
                </p>
                <ul className="mt-7 space-y-4">
                  {NOT_THIS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-subtle-foreground"
                    >
                      <X
                        size={15}
                        weight="bold"
                        className="mt-1 shrink-0 text-subtle-foreground/40"
                      />
                      <span className="line-through decoration-subtle-foreground/30">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative bg-surface/50 p-8 md:p-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-transparent"
                />
                <p className="relative font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
                  This
                </p>
                <ul className="relative mt-7 space-y-4">
                  {THIS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-foreground"
                    >
                      <Check
                        size={15}
                        weight="bold"
                        className="mt-1 shrink-0 text-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
