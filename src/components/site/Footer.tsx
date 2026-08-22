import { ArrowUp, ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import { Wordmark } from './Wordmark'

const LINKS = [
  { label: 'Case studies', href: '#case-studies' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How we work', href: '#engagement' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#inquiry' },
]

function NavLink({ label, href, index }: { label: string; href: string; index: number }) {
  return (
    <a
      href={href}
      className="group/nav flex w-fit items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono-brand text-[10px] text-muted-foreground transition-colors duration-200 group-hover/nav:border-accent/60 group-hover/nav:text-accent">
        {String(index + 1).padStart(2, '0')}
      </span>
      {label}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 pt-20">
      <div
        aria-hidden="true"
        className="blueprint-grid hidden sm:block"
        style={{
          maskImage:
            'radial-gradient(circle at 50% 100%, black, transparent 65%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 100%, black, transparent 65%)',
        }}
      />
      <div className="grain-overlay pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 pb-8 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Engineering-first software studio. Fixed scope, built to
              production.
            </p>
          </div>

          <div>
            <p className="font-mono-brand text-xs tracking-[0.2em] text-subtle-foreground/70 uppercase">
              Navigate
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {LINKS.map((link, index) => (
                <NavLink key={link.href} {...link} index={index} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono-brand text-xs tracking-[0.2em] text-subtle-foreground/70 uppercase">
              Contact
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:hello@ecnivs.com"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                hello@ecnivs.com
              </a>
              <a
                href="https://github.com/ecnivslabs"
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubLogo size={16} weight="fill" className="shrink-0" />
                ecnivslabs
                <ArrowUpRight
                  size={14}
                  className="shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none h-[clamp(64.8px,17.67vw,162px)] overflow-hidden leading-[0.8] select-none"
        >
          <span
            className="block translate-y-[22%] font-semibold whitespace-nowrap text-[clamp(88px,24vw,220px)] tracking-[-0.04em]"
            style={{
              color: '#131417',
              textShadow:
                '0 1.5px 0 rgba(255,255,255,0.16), 0 -1.5px 1px rgba(0,0,0,0.95), 0 3px 6px rgba(0,0,0,0.7)',
            }}
          >
            ecnivs
          </span>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/50 pt-7 pb-10">
          <p className="max-w-[460px] text-xs leading-relaxed text-subtle-foreground">
            Inquiry details are used to scope your project and reply to you.
            They are not shared or sold.
          </p>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono-brand text-xs text-subtle-foreground">
              &copy; {new Date().getFullYear()} ecnivs.
            </p>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-accent/60 hover:text-accent"
            >
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
