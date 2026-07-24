'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { z } from 'zod'

const subscribeSchema = z.object({ email: z.string().email(), source: z.string().default('landing') })

export default function NewsletterForm({ source = 'landing' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = subscribeSchema.safeParse({ email, source })
    if (!result.success) { setError(result.error.errors[0].message); return }
    setLoading(true)
    try {
      const res = await fetch('/api/subscribers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source }) })
      if (!res.ok) throw new Error('Failed to subscribe')
      setSuccess(true); setEmail('')
    } catch (err) { setError(err instanceof Error ? err.message : 'Something went wrong') } finally { setLoading(false) }
  }

  if (success) return <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /><span className="text-sm font-medium">You're in!</span></div>

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-brand-500/50" />
      <button type="submit" disabled={loading} className="btn-primary text-sm px-3 py-2"><Mail className="w-4 h-4" /></button>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </form>
  )
}