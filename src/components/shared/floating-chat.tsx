'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, ChevronDown } from 'lucide-react';

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hi! I\'m Komputeks AI. How can I help you today? You can ask about any of our products, services, or deployment options.' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    // Simulated AI response (real AI integration will use env vars endpoints)
    await new Promise((r) => setTimeout(r, 1000));
    const responses: Record<string, string> = {
      product: 'You can browse all our products at /products. Each one is designed for free-tier deployment. Want to deploy one to your own infrastructure?',
      deploy: 'Komputeks lets you deploy any working product directly to your GitHub, Vercel, Netlify, or Cloudflare account. Just click "Deploy in Minutes" on any product page!',
      service: 'Our services include AI integration, web development, business automation, SEO, data workflows, and cloud storage. Which area interests you?',
      price: 'Most Komputeks products are free to use. We believe constraints are where innovation begins. Paid features enhance existing functionality but never gate core value.',
    };

    const key = Object.keys(responses).find((k) => input.toLowerCase().includes(k)) || 'general';
    const general = 'That\'s a great question! Komputeks is the world\'s most trusted ecosystem for people building with limited resources. Feel free to explore our products, services, or blog for more details.';
    setMessages((prev) => [...prev, { role: 'assistant', content: responses[key] || general }]);
    setSending(false);
  };

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-600 hover:scale-105 dark:bg-brand-600 dark:shadow-brand-400/20">
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900" style={{ maxHeight: '70vh' }}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-brand-500" />
              <span className="font-semibold text-zinc-900 dark:text-white">Komputeks AI</span>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronDown className="h-4 w-4" /></button>
          </div>

          {/* Messages */}
          <div className="overflow-y-auto p-4 space-y-3" style={{ maxHeight: 'calc(70vh - 120px)' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-brand-500 text-white' : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'}`}>{msg.content}</div>
              </div>
            ))}
            {sending && <div className="flex justify-start"><div className="max-w-[80%] rounded-xl bg-zinc-100 px-3 py-2 text-sm text-zinc-500 dark:bg-zinc-800">Thinking...</div></div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about products, services, deployment..." className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500" disabled={sending} />
              <button type="submit" disabled={sending || !input.trim()} className="rounded-lg bg-brand-500 p-2 text-white hover:bg-brand-600 disabled:opacity-50"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}