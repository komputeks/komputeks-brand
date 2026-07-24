const LIPIA_BASE_URL = process.env.LIPIA_BASE_URL || 'https://lipia-api.kreativelabske.com/api/v2'

export interface LipiaPaymentInput {
  phone_number: string; amount: number; external_reference?: string;
  callback_url?: string; metadata?: Record<string, any>
}

export interface LipiaPaymentResult {
  success: boolean; transactionReference?: string; message?: string;
  customerMessage?: string; raw: any
}

export async function initiateLipiaPayment(apiKey: string, input: LipiaPaymentInput): Promise<LipiaPaymentResult> {
  const res = await fetch(`${LIPIA_BASE_URL}/payments/stk-push`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const raw = await res.json().catch(() => ({}))
  if (!res.ok || !raw.success) return { success: false, message: raw.message || `HTTP ${res.status}`, customerMessage: raw.customerMessage || 'Payment initiation failed', raw }
  return { success: true, transactionReference: raw.data?.TransactionReference, message: raw.message, customerMessage: raw.customerMessage, raw }
}

export async function checkLipiaPaymentStatus(apiKey: string, reference: string): Promise<{ status: 'PENDING' | 'SUCCESS' | 'FAILED'; data?: any; raw: any }> {
  const res = await fetch(`${LIPIA_BASE_URL}/payments/status?reference=${encodeURIComponent(reference)}`, { headers: { Authorization: `Bearer ${apiKey}` } })
  const raw = await res.json().catch(() => ({}))
  if (!res.ok || !raw.success) return { status: 'FAILED', raw }
  const response = raw.data?.response
  const status = response?.Status?.toUpperCase()
  return { status: status === 'SUCCESS' ? 'SUCCESS' : status === 'FAILED' ? 'FAILED' : 'PENDING', data: response, raw }
}