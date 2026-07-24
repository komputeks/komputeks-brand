'use client'

import { useState, useEffect } from 'react'
import NewsletterForm from './NewsletterForm'

export default function EmailPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('komputeks-popup-dismissed')
    if (dismissed) return
    const timer = setTimeout(() => setShow(true), 15000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => { setShow(false); localStorage.setItem('komputeks-popup-dismissed', '1') }

  if (!show) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="glass-card p-6">
        <button onClick={dismiss} className="absolute top-3 right-3 text-white/40 hover:text-white text-sm">✕</button>
        <h4 className="text-lg font-bold font-display text-white mb-2">Stay in the loop</h4>
        <p className="text-sm text-white/60 mb-4">Get practical insights on building with limited resources.</p>
        <NewsletterForm source="popup" />
      </div>
    </div>
  )
}