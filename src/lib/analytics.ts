interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: AnalyticsProperties) => void
    }
  }
}

export function trackEvent({
  event,
  properties,
}: {
  event: string
  properties?: AnalyticsProperties
}) {
  if (typeof window === "undefined") return
  window.posthog?.capture(event, properties)
}
