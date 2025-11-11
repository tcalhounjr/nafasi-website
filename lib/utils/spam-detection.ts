/**
 * Spam Detection Utilities for AI Chatbot
 * Implements multiple spam indicators to protect against abuse
 */

export interface SpamCheckResult {
  isSpam: boolean
  score: number
  reasons: string[]
}

// Common temporary/disposable email domains
const TEMP_EMAIL_DOMAINS = [
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'trashmail.com',
  'throwaway.email',
  'temp-mail.org',
  'yopmail.com',
]

// Spam keywords to flag in messages
const SPAM_KEYWORDS = [
  'viagra',
  'cialis',
  'bitcoin',
  'crypto',
  'investment opportunity',
  'earn money fast',
  'click here now',
  'limited time offer',
  'act now',
  'congratulations you won',
]

/**
 * Validates email format using RFC 5322 compliant regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

/**
 * Checks if email is from a temporary/disposable domain
 */
export function isTempEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return TEMP_EMAIL_DOMAINS.includes(domain)
}

/**
 * Checks for excessive special characters in name (potential spam)
 */
export function hasExcessiveSpecialChars(text: string): boolean {
  const specialCharCount = (text.match(/[^a-zA-Z0-9\s'-]/g) || []).length
  const ratio = specialCharCount / text.length
  return ratio > 0.3 // More than 30% special characters
}

/**
 * Checks for spam keywords in text
 */
export function containsSpamKeywords(text: string): boolean {
  const lowerText = text.toLowerCase()
  return SPAM_KEYWORDS.some(keyword => lowerText.includes(keyword))
}

/**
 * Checks for suspicious URLs in text
 */
export function containsSuspiciousUrls(text: string): boolean {
  // Match URLs but be more lenient for legitimate business websites
  const urlRegex = /(https?:\/\/[^\s]+)/gi
  const urls = text.match(urlRegex) || []

  // Flag if there are multiple URLs in a single message
  if (urls.length > 2) return true

  // Check for suspicious TLDs
  const suspiciousTlds = ['.xyz', '.top', '.club', '.loan', '.bid', '.stream']
  return urls.some(url => suspiciousTlds.some(tld => url.includes(tld)))
}

/**
 * Comprehensive spam check for conversation data
 */
export function checkForSpam(data: {
  name?: string
  email?: string
  messages?: Array<{ content: string }>
  ipAddress?: string
  conversationDurationMs?: number
}): SpamCheckResult {
  const reasons: string[] = []
  let score = 0

  // Check email validity
  if (data.email && !isValidEmail(data.email)) {
    score += 2
    reasons.push('Invalid email format')
  }

  // Check for temp email
  if (data.email && isTempEmail(data.email)) {
    score += 2
    reasons.push('Temporary/disposable email domain')
  }

  // Check name for excessive special characters
  if (data.name && hasExcessiveSpecialChars(data.name)) {
    score += 1
    reasons.push('Excessive special characters in name')
  }

  // Check messages for spam content
  if (data.messages) {
    const hasSpamKeywords = data.messages.some(msg =>
      containsSpamKeywords(msg.content)
    )
    if (hasSpamKeywords) {
      score += 2
      reasons.push('Contains spam keywords')
    }

    const hasSuspiciousUrls = data.messages.some(msg =>
      containsSuspiciousUrls(msg.content)
    )
    if (hasSuspiciousUrls) {
      score += 1
      reasons.push('Contains suspicious URLs')
    }
  }

  // Check for too-fast submission (< 10 seconds)
  if (data.conversationDurationMs && data.conversationDurationMs < 10000) {
    score += 2
    reasons.push('Conversation completed too quickly')
  }

  const threshold = parseInt(process.env.SPAM_SCORE_THRESHOLD || '3')

  return {
    isSpam: score >= threshold,
    score,
    reasons,
  }
}

/**
 * Rate limiting check based on IP address
 * Returns true if rate limit is exceeded
 */
export async function checkRateLimit(
  ipAddress: string,
  supabaseClient: any
): Promise<boolean> {
  const maxConversations = parseInt(
    process.env.MAX_CONVERSATIONS_PER_IP_PER_HOUR || '5'
  )

  // Get conversations from this IP in the last hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { data, error } = await supabaseClient
    .from('conversations')
    .select('id')
    .eq('ip_address', ipAddress)
    .gte('created_at', oneHourAgo)

  if (error) {
    console.error('Rate limit check error:', error)
    return false // Fail open to not block legitimate users
  }

  return data.length >= maxConversations
}
