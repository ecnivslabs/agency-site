import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import { CaretDown, Check } from '@phosphor-icons/react'
import { SmokyButton } from '@/components/ui/smoky-button'
import { cn } from '@/lib/utils'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP', 'CAD', 'AUD']

const TIMELINE_UNIT_OPTIONS = ['Days', 'Weeks', 'Months']

type FormState = {
  project: string
  description: string
  budgetAmount: string
  budgetCurrency: string
  timelineValue: string
  timelineUnit: string
  email: string
  company: string
}

const INITIAL_STATE: FormState = {
  project: '',
  description: '',
  budgetAmount: '',
  budgetCurrency: CURRENCY_OPTIONS[0],
  timelineValue: '',
  timelineUnit: TIMELINE_UNIT_OPTIONS[1],
  email: '',
  company: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_SUBMIT_MS = 2500
const RESUBMIT_COOLDOWN_MS = 30_000
const LAST_SUBMIT_KEY = 'ecnivs-inquiry-last-submit'

const inputClasses =
  'w-full rounded-xl border border-border bg-surface/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] duration-200 focus:border-accent/60 focus:outline-none focus:ring-4 focus:ring-accent/10'

const splitFieldClasses =
  'flex items-stretch rounded-xl border border-border bg-surface/60 transition-[border-color,box-shadow] duration-200 focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/10'

const splitInputClasses =
  'min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none'

const splitSelectClasses =
  'h-full cursor-pointer appearance-none bg-transparent py-3.5 pr-9 pl-4 text-sm text-foreground focus:outline-none'

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-2 text-sm text-danger"
        >
          {error}
        </p>
      )}
    </div>
  )
}

function SelectSegment({
  id,
  value,
  onChange,
  options,
  ariaLabel,
}: {
  id: string
  value: string
  onChange: (value: string) => void
  options: string[]
  ariaLabel: string
}) {
  return (
    <div className="relative flex-shrink-0">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        className={splitSelectClasses}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <CaretDown
        size={12}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}

export function Inquiry() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({})
  const [status, setStatus] = useState<Status>('idle')
  const mountedAt = useRef(0)
  const projectRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const budgetAmountRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus()
  }, [status])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function updateBudgetAmount(raw: string) {
    update('budgetAmount', raw.replace(/[^\d.,]/g, ''))
  }

  function updateTimelineValue(raw: string) {
    update('timelineValue', raw.replace(/\D/g, '').slice(0, 3))
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    if (form.project.trim().length < 2) {
      nextErrors.project = 'Tell us what the project is called.'
    }
    if (form.description.trim().length < 20) {
      nextErrors.description =
        'Give us at least a couple of sentences on what needs to exist.'
    }
    if (!form.budgetAmount.trim()) {
      nextErrors.budgetAmount = 'Give us a number, even a rough one.'
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    setErrors(nextErrors)

    if (nextErrors.project) projectRef.current?.focus()
    else if (nextErrors.description) descriptionRef.current?.focus()
    else if (nextErrors.budgetAmount) budgetAmountRef.current?.focus()
    else if (nextErrors.email) emailRef.current?.focus()

    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    const lastSubmit = Number(sessionStorage.getItem(LAST_SUBMIT_KEY) ?? 0)
    const isBot =
      form.company.trim().length > 0 ||
      Date.now() - mountedAt.current < MIN_SUBMIT_MS
    const isThrottled = Date.now() - lastSubmit < RESUBMIT_COOLDOWN_MS

    if (isBot) {
      setStatus('success')
      setForm(INITIAL_STATE)
      return
    }

    if (isThrottled) {
      setStatus('success')
      return
    }

    const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT
    if (!endpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')
    try {
      const { company: _company, ...payload } = form
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Request failed')
      sessionStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()))
      setStatus('success')
      setForm(INITIAL_STATE)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="inquiry" className="border-t border-border/60 py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background shadow-[0_0_0_6px_hsl(var(--background)),0_20px_44px_-20px_rgba(0,0,0,0.85)]">
            <Check size={20} weight="bold" className="text-accent" />
          </div>
          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            role="status"
            className="mt-6 text-3xl font-semibold tracking-tight text-foreground outline-none"
          >
            Received.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We read every inquiry ourselves. Expect a reply at the address you
            gave us within two business days.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="inquiry" className="border-t border-border/60 py-28">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            Start here
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start a project.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Give us the scope as you understand it today. We will come back with
            questions, not a form rejection.
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-10 rounded-2xl bg-gradient-to-b from-border/80 via-border/30 to-border/80 p-px shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 rounded-2xl bg-background p-8 sm:p-10"
          >
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(event) => update('company', event.target.value)}
              />
            </div>

            <Field
              label="Project name"
              htmlFor="project"
              error={errors.project}
            >
              <input
                ref={projectRef}
                id="project"
                type="text"
                value={form.project}
                onChange={(event) => update('project', event.target.value)}
                placeholder="What should we call this"
                aria-invalid={errors.project ? true : undefined}
                aria-describedby={errors.project ? 'project-error' : undefined}
                className={cn(inputClasses, errors.project && 'border-danger')}
              />
            </Field>

            <Field
              label="What needs to exist"
              htmlFor="description"
              error={errors.description}
            >
              <textarea
                ref={descriptionRef}
                id="description"
                rows={5}
                value={form.description}
                onChange={(event) => update('description', event.target.value)}
                placeholder="The problem, who it's for, and what done looks like"
                aria-invalid={errors.description ? true : undefined}
                aria-describedby={
                  errors.description ? 'description-error' : undefined
                }
                className={cn(
                  inputClasses,
                  'resize-none',
                  errors.description && 'border-danger',
                )}
              />
            </Field>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Budget"
                htmlFor="budget-amount"
                error={errors.budgetAmount}
              >
                <div
                  className={cn(
                    splitFieldClasses,
                    errors.budgetAmount && 'border-danger',
                  )}
                >
                  <SelectSegment
                    id="budget-currency"
                    value={form.budgetCurrency}
                    onChange={(value) => update('budgetCurrency', value)}
                    options={CURRENCY_OPTIONS}
                    ariaLabel="Currency"
                  />
                  <div className="w-px bg-border" />
                  <input
                    ref={budgetAmountRef}
                    id="budget-amount"
                    type="text"
                    inputMode="decimal"
                    value={form.budgetAmount}
                    onChange={(event) =>
                      updateBudgetAmount(event.target.value)
                    }
                    placeholder="e.g. 15,000"
                    aria-invalid={errors.budgetAmount ? true : undefined}
                    aria-describedby={
                      errors.budgetAmount ? 'budget-amount-error' : undefined
                    }
                    className={splitInputClasses}
                  />
                </div>
              </Field>

              <Field label="Target window" htmlFor="timeline-value">
                <div className={splitFieldClasses}>
                  <input
                    id="timeline-value"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={form.timelineValue}
                    onChange={(event) =>
                      updateTimelineValue(event.target.value)
                    }
                    placeholder="6"
                    className={splitInputClasses}
                  />
                  <div className="w-px bg-border" />
                  <SelectSegment
                    id="timeline-unit"
                    value={form.timelineUnit}
                    onChange={(value) => update('timelineUnit', value)}
                    options={TIMELINE_UNIT_OPTIONS}
                    ariaLabel="Unit"
                  />
                </div>
              </Field>
            </div>

            <Field label="Contact email" htmlFor="email" error={errors.email}>
              <input
                ref={emailRef}
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => update('email', event.target.value)}
                placeholder="you@company.com"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={cn(inputClasses, errors.email && 'border-danger')}
              />
            </Field>

            {status === 'unconfigured' && (
              <p
                role="alert"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground"
              >
                We are not able to take inquiries through this form right now.
                Email us directly at{' '}
                <a
                  href="mailto:hello@ecnivs.com"
                  className="text-accent hover:underline"
                >
                  hello@ecnivs.com
                </a>{' '}
                and we will pick it up from there.
              </p>
            )}

            {status === 'error' && (
              <p
                role="alert"
                className="rounded-xl border border-danger/40 bg-surface px-4 py-3 text-sm text-danger"
              >
                The inquiry did not send. Try again, or email us directly at{' '}
                <a href="mailto:hello@ecnivs.com" className="hover:underline">
                  hello@ecnivs.com
                </a>
                .
              </p>
            )}

            <Magnetic strength={0.2}>
              <SmokyButton
                type="submit"
                size="lg"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending' : 'Send inquiry'}
              </SmokyButton>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
