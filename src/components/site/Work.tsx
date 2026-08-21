import { ArrowUpRight } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

type Repo = {
  name: string
  description: string
  language: string
  note: string
  url: string
}

const REPOS: Repo[] = [
  {
    name: 'olive',
    description:
      'A statically typed systems language with its own compiler and runtime, written from an empty repository.',
    language: 'Rust',
    note: 'Hand-written recursive-descent parser. No parser-generator dependency.',
    url: 'https://github.com/ecnivslabs/olive',
  },
  {
    name: 'pit-registry',
    description:
      'Package registry and distribution system for the Olive ecosystem.',
    language: 'Systems',
    note: 'Content-addressed storage, atomic publish. No partial-package states.',
    url: 'https://github.com/ecnivslabs/pit-registry',
  },
]

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block h-full rounded-2xl bg-gradient-to-b from-border/80 via-border/30 to-border/80 p-px transition-[background] duration-500 hover:from-accent/60 hover:via-accent/15 hover:to-border/70"
    >
      <div className="relative flex h-full flex-col rounded-2xl bg-background p-8 transition-shadow duration-500 group-hover:shadow-[0_36px_80px_-36px_rgba(0,0,0,0.9)]">
        <div className="flex items-start justify-between">
          <span className="font-accent-serif text-2xl text-accent/80">
            {String(index + 1).padStart(2, '0')}
          </span>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>

        <span className="mt-6 font-mono-brand text-lg text-foreground">
          {repo.name}
        </span>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {repo.description}
        </p>

        <div className="mt-6 border-t border-border/50 pt-5">
          <p className="font-mono-brand text-xs leading-relaxed text-subtle-foreground">
            {repo.note}
          </p>
          <span className="mt-4 inline-flex items-center rounded-full border border-border/60 px-2.5 py-1 font-mono-brand text-[11px] tracking-wide text-subtle-foreground uppercase">
            {repo.language}
          </span>
        </div>
      </div>
    </a>
  )
}

export function Work() {
  return (
    <section id="work" className="border-t border-border/60 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            Open source
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Open on GitHub.
            </h2>
            <a
              href="https://github.com/ecnivslabs"
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              github.com/ecnivslabs
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {REPOS.map((repo, index) => (
            <Reveal key={repo.name} delay={index * 0.06}>
              <RepoCard repo={repo} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
