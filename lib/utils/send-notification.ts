import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadData {
  name: string
  email: string
  projectDescription: string
  timeline: string
  budgetRange: string
  messages: Array<{ role: string; content: string; timestamp?: string }>
}

function generateEmailHTML(leadData: LeadData): string {
  const messagesHTML = leadData.messages
    .map(
      (msg) => `
      <div class="message">
        <span class="message-role">${msg.role === 'user' ? 'User' : 'Nafasi AI'}:</span>
        <span class="message-content">${msg.content}</span>
      </div>
    `
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #31b292, #4dd4ae);
      color: white;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 8px;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 0;
      opacity: 0.95;
      font-size: 16px;
    }
    .content {
      padding: 32px 24px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
    .field:last-of-type {
      border-bottom: none;
    }
    .field-label {
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 6px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-value {
      color: #404040;
      font-size: 16px;
      line-height: 1.6;
    }
    .field-value a {
      color: #31b292;
      text-decoration: none;
    }
    .transcript {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 6px;
      margin-top: 24px;
      border-left: 4px solid #31b292;
    }
    .transcript h3 {
      margin: 0 0 16px;
      color: #1a1a1a;
      font-size: 18px;
    }
    .message {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 1.6;
    }
    .message-role {
      font-weight: 600;
      color: #31b292;
      display: inline-block;
      min-width: 80px;
    }
    .message-content {
      color: #404040;
    }
    .footer {
      margin-top: 24px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 6px;
    }
    .footer strong {
      color: #1a1a1a;
    }
    .footer p {
      margin: 8px 0 0;
      color: #666;
      font-size: 14px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 New Qualified Lead</h1>
      <p>From Nafasi AI Chatbot</p>
    </div>

    <div class="content">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${leadData.name}</div>
      </div>

      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value">
          <a href="mailto:${leadData.email}">${leadData.email}</a>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Project Description</div>
        <div class="field-value">${leadData.projectDescription}</div>
      </div>

      <div class="field">
        <div class="field-label">Timeline</div>
        <div class="field-value">${leadData.timeline}</div>
      </div>

      <div class="field">
        <div class="field-label">Budget Range</div>
        <div class="field-value">${leadData.budgetRange}</div>
      </div>

      <div class="transcript">
        <h3>Conversation Transcript</h3>
        ${messagesHTML}
      </div>

      <div class="footer">
        <strong>Next Steps:</strong>
        <p>Follow up with ${leadData.name} within 24 hours at <a href="mailto:${leadData.email}">${leadData.email}</a></p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

export async function sendLeadNotification(leadData: LeadData): Promise<{
  success: boolean
  error?: any
}> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Nafasi Chatbot <chatbot@nafasi.io>',
      to: process.env.NOTIFICATION_EMAIL || 'hello@nafasi.io',
      subject: `New Qualified Lead: ${leadData.name} from Nafasi Chatbot`,
      html: generateEmailHTML(leadData),
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }

    console.log('Lead notification sent:', data)
    return { success: true }
  } catch (error) {
    console.error('Email notification error:', error)
    return { success: false, error }
  }
}
