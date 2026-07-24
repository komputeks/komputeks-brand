'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message { id: string; role: 'user' | 'assistant'; content: string; timestamp: Date }
interface Provider { id: string; name: string; provider_type: string; is_admin: boolean; models: string[] }

const suggestions = ['What is Komputeks?', 'How do I get started?', 'Tell me about your products', 'What does "building anyway" mean?'];

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('admin');
  const [showProviders, setShowProviders] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Load providers and chat history on open
  useEffect(() => {
    if (!open) return;
    loadProviders();
    loadChatHistory();
  }, [open]);

  const loadProviders = async () => {
    try {
      const res = await fetch('/api/ai-providers');
      if (res.ok) {
        const data = await res.json();
        setProviders(data);
      }
    } catch {}
  };

  const loadChatHistory = async () => {
    // Get current user
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const res = await fetch(`/api/chat-session?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })));
          }
        }
      }
    } catch {}
  };

  const saveChatHistory = async (msgs: Message[]) => {
    if (!userId) return;
    try {
      await fetch('/api/chat-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, messages: msgs.slice(-50), selectedProvider }),
      });
    } catch {}
  };

  const send = async (text?: string) => {
    const content = text || input;
    if (!content.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: newMessages.slice(-6),
          providerId: selectedProvider,
        }),
      });
      if (!res.ok) throw new Error('Failed to get response');
      const data = await res.json();
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: data.response, timestamp: new Date() };
      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } catch {
      const errMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Sorry, I could not process your request. Please try again.', timestamp: new Date() };
      const finalMessages = [...newMessages, errMsg];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } finally { setLoading(false); }
  };

  const adminProviders = providers.filter(p => p.is_admin);
  const userProviders = providers.filter(p => !p.is_admin);
  const currentProviderName = selectedProvider === 'admin'
    ? 'Komputeks AI'
    : providers.find(p => p.id === selectedProvider)?.name || 'Komputeks AI';

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-500/25 hover:scale-105 transition-all flex items-center justify-center"
        aria-label="AI Chat"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {open && (
        <div className={cn(
          'fixed z-50 bg-surface-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300',
          fullscreen
            ? 'inset-4'
            : 'bottom-24 right-6 w-[380px] max-h-[500px]'
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold font-display">{currentProviderName}</span>
                {/* Provider dropdown */}
                <button
                  onClick={() => setShowProviders(!showProviders)}
                  className="ml-2 p-0.5 hover:bg-white/5 rounded"
                >
                  <ChevronDown className="w-3 h-3 text-white/50" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setFullscreen(!fullscreen)} className="p-1 hover:bg-white/5 rounded-lg">
                {fullscreen ? <Minimize2 className="w-4 h-4 text-white/70" /> : <Maximize2 className="w-4 h-4 text-white/70" />}
              </button>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/5 rounded-lg">
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Provider selector dropdown */}
          {showProviders && (
            <div className="p-3 border-b border-white/10 bg-white/5">
              <p className="text-xs text-white/40 mb-2">Select AI Provider</p>
              <div className="space-y-1">
                <button
                  onClick={() => { setSelectedProvider('admin'); setShowProviders(false); }}
                  className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', selectedProvider === 'admin' ? 'bg-brand-500/20 text-brand-400' : 'text-white/60 hover:bg-white/5')}
                >
                  🤖 Komputeks AI (Default)
                </button>
                {adminProviders.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProvider(p.id); setShowProviders(false); }}
                    className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', selectedProvider === p.id ? 'bg-brand-500/20 text-brand-400' : 'text-white/60 hover:bg-white/5')}
                  >
                    ⚡ {p.name} ({p.provider_type})
                  </button>
                ))}
                {userId && userProviders.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProvider(p.id); setShowProviders(false); }}
                    className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', selectedProvider === p.id ? 'bg-brand-500/20 text-brand-400' : 'text-white/60 hover:bg-white/5')}
                  >
                    🔑 {p.name} (Your key)
                  </button>
                ))}
                {userId && (
                  <a href="/dashboard/ai" className="w-full text-left px-3 py-2 rounded-lg text-sm text-cyan-400 hover:bg-white/5 block">
                    + Add your own provider
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <Sparkles className="w-8 h-8 text-brand-400 mx-auto mb-3" />
                <p className="text-sm text-white/60 mb-4">Ask me anything about Komputeks</p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.map(s => (
                    <button key={s} onClick={() => send(s)} className="text-xs text-white/70 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-colors">{s}</button>
                  ))}
                </div>
              </div>
            ) : messages.map(m => (
              <div key={m.id} className={cn('rounded-xl px-4 py-3 text-sm', m.role === 'user' ? 'bg-brand-500/10 text-white ml-8' : 'bg-white/5 text-white/90 mr-8')}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-white/5 rounded-xl px-4 py-3 mr-8">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-500"
              />
              <button type="submit" disabled={loading || !input.trim()} className="p-2.5 bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all disabled:opacity-50">
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
