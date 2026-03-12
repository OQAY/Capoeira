// Silent page view tracker — invisible to users
export function trackPageView() {
  if (typeof window === 'undefined') return

  // Don't track in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return

  // Small delay to not block rendering
  setTimeout(() => {
    const payload = {
      path: window.location.pathname + window.location.hash,
      referrer: document.referrer || null,
      sw: window.screen.width,
      sh: window.screen.height,
      lang: navigator.language,
    }

    // Use sendBeacon for reliability (doesn't block page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', JSON.stringify(payload))
    } else {
      fetch('/api/track', {
        method: 'POST',
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {})
    }
  }, 300)
}
