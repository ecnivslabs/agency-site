export function initAnalytics(): void {
  const src = import.meta.env.VITE_ANALYTICS_SCRIPT_URL
  const domain = import.meta.env.VITE_ANALYTICS_DOMAIN
  if (!src || !domain) return

  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.src = src
  document.head.appendChild(script)
}
