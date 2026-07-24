import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history, providerId } = await request.json();
    const supabase = createAdminClient();

    // Find the provider to use
    let provider;
    if (providerId && providerId !== 'admin') {
      const { data } = await supabase
        .from('komputeks_ai_providers')
        .select('*')
        .eq('id', providerId)
        .eq('active', true)
        .single();
      provider = data;
    } else {
      const { data } = await supabase
        .from('komputeks_ai_providers')
        .select('*')
        .eq('active', true)
        .eq('is_admin', true)
        .limit(1);
      provider = data?.[0];
    }

    // Fallback if no provider or placeholder key
    if (!provider || !provider.api_key || provider.api_key === 'placeholder') {
      const komputeksInfo: Record<string, string> = {
        'what is komputeks': 'Komputeks is the world\'s most trusted ecosystem for people building with limited resources. Not hobbyists. Not poor people. People with more determination than resources.',
        'how do i get started': 'Browse our Products page to explore available tools, create a free account, and subscribe to updates.',
        'tell me about your products': 'We have 18+ products including Telecloud (cloud storage), SheetSync (Google Sheets to API), Madeal (ecommerce), FortuneForge (SaaS ideas), and more.',
        'what does building anyway mean': 'It means choosing progress over perfection. Many successful people started long before they had enough confidence, capital, or experience. Momentum rarely precedes action.',
        'deploy': 'You can deploy any Komputeks product in minutes! Visit a product\'s detail page and click "Deploy in Minutes" to get started.',
      };
      const lowerMsg = message.toLowerCase();
      for (const [key, value] of Object.entries(komputeksInfo)) {
        if (lowerMsg.includes(key)) return NextResponse.json({ response: value });
      }
      return NextResponse.json({ response: 'I\'m Komputeks AI. I can tell you about our products, philosophy, and how to get started. Ask me anything!' });
    }

    // Build API URL based on provider type
    const apiUrl = provider.api_url || (
      provider.provider_type === 'openai' ? 'https://api.openai.com/v1/chat/completions' :
      provider.provider_type === 'anthropic' ? 'https://api.anthropic.com/v1/messages' :
      provider.provider_type === 'groq' ? 'https://api.groq.com/openai/v1/chat/completions' :
      provider.provider_type === 'gemini' ? `https://generativelanguage.googleapis.com/v1beta/models/${provider.models?.[0] || 'gemini-pro'}:generateContent` :
      'https://api.openai.com/v1/chat/completions'
    );
    const model = provider.models?.[0] || 'gpt-3.5-turbo';

    // OpenAI-compatible format (works for OpenAI, Groq, and custom endpoints)
    if (provider.provider_type === 'openai' || provider.provider_type === 'groq' || provider.provider_type === 'custom') {
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${provider.api_key}` },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: 'You are Komputeks AI assistant. Komputeks is the world\'s most trusted ecosystem for people building with limited resources. Be helpful, concise, and inspiring. Use the brand voice: determined, practical, real.' },
              ...(history || []).map((h: { role: string; content: string }) => ({ role: h.role, content: h.content })),
              { role: 'user', content: message },
            ],
            max_tokens: 500,
          }),
        });
        if (!res.ok) throw new Error(`AI API failed: ${res.status}`);
        const data = await res.json();
        return NextResponse.json({ response: data.choices?.[0]?.message?.content || 'I couldn\'t process that. Please try again.' });
      } catch {
        return NextResponse.json({ response: 'I\'m having trouble connecting to my AI backend. Please try again in a moment.' });
      }
    }

    // Anthropic format
    if (provider.provider_type === 'anthropic') {
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': provider.api_key, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({
            model,
            max_tokens: 500,
            system: 'You are Komputeks AI assistant. Be helpful, concise, and inspiring.',
            messages: [
              ...(history || []).map((h: { role: string; content: string }) => ({ role: h.role, content: h.content })),
              { role: 'user', content: message },
            ],
          }),
        });
        if (!res.ok) throw new Error(`Anthropic API failed: ${res.status}`);
        const data = await res.json();
        return NextResponse.json({ response: data.content?.[0]?.text || 'I couldn\'t process that.' });
      } catch {
        return NextResponse.json({ response: 'Having trouble with the Anthropic backend. Try again.' });
      }
    }

    // Gemini format
    if (provider.provider_type === 'gemini') {
      try {
        const res = await fetch(`${apiUrl}?key=${provider.api_key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
          }),
        });
        if (!res.ok) throw new Error(`Gemini API failed: ${res.status}`);
        const data = await res.json();
        return NextResponse.json({ response: data.candidates?.[0]?.content?.parts?.[0]?.text || 'I couldn\'t process that.' });
      } catch {
        return NextResponse.json({ response: 'Having trouble with the Gemini backend. Try again.' });
      }
    }

    return NextResponse.json({ response: 'Unknown provider type. Please check your configuration.' });
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json({ response: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
