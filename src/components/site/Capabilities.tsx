import type { Icon } from '@phosphor-icons/react'
import {
  Atom,
  Circuitry,
  DeviceMobile,
  Globe,
  Stack,
} from '@phosphor-icons/react'
import { Reveal } from './Reveal'

type Domain = {
  name: string
  detail: string
  icon: Icon
}

const DOMAINS: Domain[] = [
  {
    name: 'Fullstack Development',
    detail:
      'We rebuilt a three-year-stalled product’s entire stack, frontend and backend, from scratch and shipped it in two months. It runs in production today, with paying subscribers.',
    icon: Stack,
  },
  {
    name: 'Systems Development',
    detail:
      'We run our own package registry and distribution infrastructure in production. Infrastructure work is not a service we describe. It is what we operate daily.',
    icon: Circuitry,
  },
  {
    name: 'Web Development',
    detail:
      'Product-grade frontends and services, from first commit to production traffic. You are looking at one right now.',
    icon: Globe,
  },
  {
    name: 'Mobile App Development',
    detail:
      'Native and cross-platform apps built to reach both stores, not proof-of-concept builds that stall before release.',
    icon: DeviceMobile,
  },
  {
    name: 'AI Development',
    detail:
      'The job-search platform we rebuilt runs on our own AI layer, live in production, not a slide-deck pitch.',
    icon: Atom,
  },
]

function DomainRow({ domain, index }: { domain: Domain; index: number }) {
  return (
    <div className="group grid grid-cols-1 gap-3 border-t border-border/60 py-8 transition-colors duration-300 hover:bg-surface/50 md:grid-cols-[96px_320px_1fr] md:items-start md:gap-8 md:px-2 md:py-10">
      <div className="font-accent-serif text-3xl text-accent md:text-4xl">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-border transition-colors duration-300 group-hover:border-accent/50">
          <domain.icon size={20} weight="light" className="text-accent" />
        </div>
        <div className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {domain.name}
        </div>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:pt-1.5 md:text-[15px]">
        {domain.detail}
      </p>
    </div>
  )
}

export function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-border/60 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            Capabilities
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Multidisciplinary,{' '}
            <span className="font-accent-serif text-accent">
              proven in production.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            If it can be written in code, we build it. Not a menu of everything
            we could plausibly bill for. Five disciplines we run in production
            right now.
          </p>
        </Reveal>

        <div className="mt-12">
          {DOMAINS.map((domain, index) => (
            <Reveal key={domain.name} delay={index * 0.05}>
              <DomainRow domain={domain} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
