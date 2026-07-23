import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    const supabase = createAdminClient();
    const { data: providers } = await supabase.from('komputeks_ai_providers').select('*').eq('active', true).eq('is_admin', true).limit(1);
    if (!providers || providers.length === 0) {
      return NextResponse.json({ response: 'I\'m Komputeks AI. I can tell you about our products, philosophy, and how to get started. What would you like to know?' });
    }
    const provider = providers[0];
    const apiKey = provider.api_key;
    const model = provider.models?.[0] || 'gpt-3.5-turbo';
    if (!apiKey || apiKey === 'placeholder') {
      const komputeksInfo = {
        'What is Komputeks?': 'Komputeks is the world\'s most trusted ecosystem for people building with limited resources. Not hobbyists. Not poor people. People with more determination than resources.',
        'How do I get started?': 'Browse our Products page to explore available tools, create a free account, and subscribe to updates.',
        'Tell me about your products': 'We have 18+ products including Telecloud (cloud storage), SheetSync (Google Sheets to API), Madeal (ecommerce), FortuneForge (SaaS ideas), and more.',
        'What does building anyway mean?': 'It means choosing progress over perfection. Many successful people started long before they had enough confidence, capital, or experience. Momentum rarely precedes action.',
      }; const lowerMsg = message.toLowerCase(); for (const [key, value] of Object.entries(komputeksInfo)) { if (lowerMsg.includes(key.toLowerCase().replace('?',''))) return NextResponse.json({ response: value }); } return NextResponse.json({ response: 'I\'m Komputeks AI. I can tell you about our products, philosophy, and how to get started. Ask me anything!' });
    }
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model, messages: [{ role: 'system', content: 'You are Komputeks AI assistant. Komputeks is the world\'s most trusted ecosystem for people building with limited resources. Be helpful, concise, and inspiring. Use the brand voice: determined, practical, real.' }, ...(history || []).map((h: {role:string,content:string}) => ({ role: h.role, content: h.content })), { role: 'user', content: message }], max_tokens: 500 }) }); if (!res.ok) throw new Error('AI API failed'); const data = await res.json(); return NextResponse.json({ response: data.choices?.[0]?.message?.content || 'I couldn\'t process that. Please try again.' });
    } catch { return NextResponse.json({ response: 'I\'m having trouble connecting to my AI backend. Please try again in a moment.' }); }
  } catch (err) { console.error('Chat error:', err); return NextResponse.json({ response: 'Something went wrong. Please try again.' }, { status: 500 }); }
}