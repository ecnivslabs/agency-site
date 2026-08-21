import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { SmokyButton } from '@/components/ui/smoky-button'
import { cn } from '@/lib/utils'
import { Magnetic } from './Magnetic'
import { Wordmark } from './Wordmark'

const SECTIONS = [
  { id: 'case-studies', label: 'Case studies' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'engagement', label: 'How we work' },
  { id: 'work', label: 'Work' },
  { id: 'inquiry', label: 'Contact' },
]

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Nav() {
  const [active, setActive] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.2,
  })

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 8
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  function closeMenu() {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const panel = menuPanelRef.current
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : []
    focusables[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== 'Tab' || focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (
        panel &&
        !panel.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen])

  return (
    <nav
      className={
        scrolled
          ? 'fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.6)] backdrop-blur-md transition-shadow duration-300'
          : 'fixed inset-x-0 top-0 z-40 border-b border-transparent bg-background/50 backdrop-blur-md transition-shadow duration-300'
      }
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        <a href="#top" aria-label="ecnivs home">
          <Wordmark />
        </a>

        <div className="hidden items-center md:flex">
          {SECTIONS.map((section, index) => (
            <span key={section.id} className="flex items-center">
              <a
                href={`#${section.id}`}
                className={cn(
                  'font-mono-brand px-4 py-2 text-[11px] tracking-[0.08em] uppercase transition-colors',
                  active === section.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {section.label}
              </a>
              {index < SECTIONS.length - 1 && (
                <span aria-hidden="true" className="h-4 w-px bg-border/70" />
              )}
            </span>
          ))}
        </div>

        <div className="hidden md:block">
          <Magnetic strength={0.25}>
            <SmokyButton size="sm" asChild>
              <a href="#inquiry">Start a project</a>
            </SmokyButton>
          </Magnetic>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="text-foreground md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuPanelRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    'font-mono-brand py-2 text-xs tracking-[0.08em] uppercase transition-colors',
                    active === section.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                  onClick={closeMenu}
                >
                  {section.label}
                </a>
              ))}
              <SmokyButton
                size="sm"
                asChild
                className="mt-2 w-full"
                onClick={closeMenu}
              >
                <a href="#inquiry">Start a project</a>
              </SmokyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
