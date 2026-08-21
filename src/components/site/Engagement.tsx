import { Reveal } from './Reveal'

const MOVEMENTS = [
  {
    verb: 'Scope',
    body: 'We work through the problem with you until there is a single, written definition of what gets built and what does not.',
  },
  {
    verb: 'Commit',
    body: 'The scope becomes a price and a timeline. No hourly clock, no changing rate as the project runs.',
  },
  {
    verb: 'Build',
    body: 'One team builds the whole thing, with regular checkpoints against what you signed off on, not a moving target.',
  },
  {
    verb: 'Ship',
    body: 'You get a finished, running system in production, plus the handoff documentation to operate it without us.',
  },
]

export function Engagement() {
  return (
    <section id="engagement" className="border-t border-border/60 py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12">
        <Reveal className="md:sticky md:top-28 md:col-span-4 md:h-fit">
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How a project runs.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Four moves, in order, on every engagement we take.
          </p>
        </Reveal>

        <div className="relative md:col-span-8">
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-4 hidden w-px bg-border/60 md:block"
          />
          {MOVEMENTS.map((movement, index) => (
            <Reveal key={movement.verb} delay={index * 0.08}>
              <div className="group relative border-t border-border/60 py-8 first:border-t-0 first:pt-0 md:flex md:gap-10 md:border-t-0 md:py-10">
                <div className="relative z-10 hidden shrink-0 md:block">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background font-mono-brand text-xs text-muted-foreground transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="flex-1">
                  <span className="font-mono-brand text-sm text-muted-foreground md:hidden">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:mt-0 sm:text-[1.75rem]">
                    {movement.verb}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {movement.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
