import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const AUTH_TAG_LENGTH = 16

function getKey(): Buffer {
  const envKey = process.env.ENCRYPTION_KEY
  if (!envKey) throw new Error('ENCRYPTION_KEY environment variable is required')
  if (envKey.length === 64 && /^[0-9a-f]+$/i.test(envKey)) return Buffer.from(envKey, 'hex')
  return crypto.createHash('sha256').update(envKey).digest()
}

export function encrypt(text: string | null | undefined): string | null {
  if (!text) return null
  const key = getKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  return Buffer.concat([iv, authTag, encrypted]).toString('base64')
}

export function decrypt(encryptedText: string | null | undefined): string | null {
  if (!encryptedText) return null
  try {
    const key = getKey()
    const data = Buffer.from(encryptedText, 'base64')
    const iv = data.subarray(0, IV_LENGTH)
    const authTag = data.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH)
    const encrypted = data.subarray(IV_LENGTH + AUTH_TAG_LENGTH)
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
  } catch { return null }
}

export function generateEncryptionKey(): string { return crypto.randomBytes(32).toString('hex') }