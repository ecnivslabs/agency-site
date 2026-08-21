import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { SmokyButton } from '@/components/ui/smoky-button'
import { ShaderBackground } from '@/components/ui/shader-background'
import { Magnetic } from './Magnetic'

const EASE = [0.16, 1, 0.3, 1] as const

const HEADLINE_WORDS = [
  'Ambitious',
  'engineering,',
  'shipped',
  'end',
  'to',
  'end.',
]

function HeroMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <path
          id="hero-arc"
          d="M 4.892 8.777 A 6.5 6.5 0 0 1 17.108 13.223"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <linearGradient id="hero-arc-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--accent-highlight))" />
        </linearGradient>
      </defs>
      <use href="#hero-arc" stroke="hsl(var(--foreground))" />
      <use
        href="#hero-arc"
        transform="rotate(180 16 16)"
        stroke="url(#hero-arc-accent)"
      />
    </svg>
  )
}

function useIsDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 640px)').matches,
  )

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 640px)')
    const handleChange = () => setIsDesktop(mql.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return isDesktop
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktopViewport()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 26])
  const markOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 z-0 bg-background">
        {isDesktop && (
          <ShaderBackground className="absolute inset-0 opacity-85" />
        )}
        <div aria-hidden="true" className="blueprint-grid hidden sm:block" />
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 right-[-14%] hidden h-[560px] w-[560px] -translate-y-1/2 sm:block lg:h-[760px] lg:w-[760px]"
          style={
            reduceMotion
              ? { opacity: 0.9 }
              : { scale: markScale, rotate: markRotate, opacity: markOpacity }
          }
        >
          <HeroMark />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, hsl(var(--background) / 0.88) 22%, hsl(var(--background) / 0.55) 52%, hsl(var(--background) / 0.15) 100%)',
          }}
        />
        <div className="grain-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-2.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono-brand text-xs tracking-wide text-muted-foreground uppercase">
              Engineering studio, open for projects
            </span>
          </motion.div>

          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {HEADLINE_WORDS.map((word, index) => (
              <span
                key={word}
                className="mr-[0.28em] inline-block overflow-hidden"
              >
                <motion.span
                  initial={reduceMotion ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + index * 0.05,
                    ease: EASE,
                  }}
                  className={
                    word === 'Ambitious'
                      ? 'font-accent-serif smoky-text inline-block bg-clip-text font-normal text-transparent'
                      : 'inline-block'
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Software, AI, and systems for teams who need something built, not
            managed.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Magnetic strength={0.3}>
              <SmokyButton size="lg" asChild>
                <a href="#inquiry">Start a project</a>
              </SmokyButton>
            </Magnetic>
            <a
              href="https://github.com/ecnivslabs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ecnivs on GitHub
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
