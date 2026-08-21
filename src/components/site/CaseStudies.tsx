import { ArrowUpRight } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

type CaseLink = {
  label: string
  url: string
}

type CaseStudy = {
  metric: string
  title: string
  body: string
  note: string
  links?: CaseLink[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    metric: '3 years → 2 months',
    title: 'Full-stack rebuild, ground up',
    body: 'Client had been building their product for three years without shipping. We rebuilt the entire stack, frontend and backend, from scratch and shipped a working product in two months. It is live now, with paying subscribers.',
    note: 'AI-powered job search automation platform',
  },
  {
    metric: 'MTProto + virtual SSD',
    title: 'Protocol and storage backend, from scratch',
    body: "Built a Telegram-compatible MTProto server and a virtual SSD storage backend from scratch for a messaging platform's infrastructure.",
    note: 'Messaging infrastructure client',
  },
  {
    metric: '13 fps → 120 fps',
    title: 'Language and engine optimization',
    body: "Client's own systems language, built to be as fast as Rust and easier to learn. We rewrote its interpreter architecture with a hybrid JIT/AOT execution model for native speeds, then optimized their dogfood game engine on top of it.",
    note: 'Open source',
    links: [
      { label: 'ling', url: 'https://github.com/taellinglin/ling' },
      {
        label: 'soul-symphony-ling-edition',
        url: 'https://github.com/taellinglin/soul-symphony-ling-edition',
      },
    ],
  },
]

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <div className="group relative h-full rounded-2xl bg-gradient-to-b from-border/80 via-border/30 to-border/80 p-px transition-[background] duration-500 hover:from-accent/60 hover:via-accent/15 hover:to-border/70">
      <div className="relative flex h-full flex-col rounded-2xl bg-background p-8 transition-shadow duration-500 group-hover:shadow-[0_36px_80px_-36px_rgba(0,0,0,0.9)]">
        <div className="flex items-start justify-between">
          <span className="font-accent-serif text-2xl text-accent/80">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-mono-brand text-[11px] tracking-[0.2em] text-subtle-foreground/70 uppercase">
            Case study
          </span>
        </div>

        <div className="mt-7">
          <span className="font-mono-brand text-xl font-medium tracking-tight text-accent sm:text-[1.4rem]">
            {study.metric}
          </span>
          <div className="mt-3 h-px w-10 bg-gradient-to-r from-accent to-transparent" />
        </div>

        <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
          {study.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {study.body}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/50 pt-5 font-mono-brand text-xs tracking-wide text-subtle-foreground uppercase">
          <span>{study.note}</span>
          {study.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 normal-case transition-colors hover:text-accent"
            >
              {link.label}
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CaseStudies() {
  return (
    <section id="case-studies" className="border-t border-border/60 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            Selected work
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Shipped, not theoretical.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Client details are confidential. The scope and outcomes are not.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((study, index) => (
            <Reveal key={study.title} delay={index * 0.06}>
              <CaseStudyCard study={study} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
