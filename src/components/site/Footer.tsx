import { Wordmark } from './Wordmark'

const LINKS = [
  { label: 'Case studies', href: '#case-studies' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How we work', href: '#engagement' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#inquiry' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1.3fr_1fr_1fr]">
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
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono-brand text-xs tracking-[0.2em] text-subtle-foreground/70 uppercase">
              Contact
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href="mailto:hello@ecnivs.com"
                className="w-fit transition-colors hover:text-foreground"
              >
                hello@ecnivs.com
              </a>
              <a
                href="https://github.com/ecnivslabs"
                target="_blank"
                rel="noreferrer"
                className="w-fit transition-colors hover:text-foreground"
              >
                github.com/ecnivslabs
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-subtle-foreground">
            Inquiry details are used to scope your project and reply to you.
            They are not shared or sold.
          </p>
          <p className="text-xs text-subtle-foreground">
            &copy; {new Date().getFullYear()} ecnivs.
          </p>
        </div>
      </div>
    </footer>
  )
}
