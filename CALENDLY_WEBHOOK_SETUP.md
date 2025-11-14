# Calendly Webhook Setup Instructions

The chatbot requires a Calendly webhook to send email notifications when users book meetings. Follow these steps to set it up:

## Step 1: Get Your Calendly Access Token

1. Go to https://calendly.com/integrations/api_tokens
2. Create a new Personal Access Token
3. Copy the token (you'll need it in the next step)

## Step 2: Get Your Organization and User URIs

Run this command with your access token:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  https://api.calendly.com/users/me
```

From the response, note:
- `uri` field (your User URI)
- `current_organization` field (your Organization URI)

Example response:
```json
{
  "resource": {
    "uri": "https://api.calendly.com/users/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "current_organization": "https://api.calendly.com/organizations/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    ...
  }
}
```

## Step 3: Set Environment Variables

Create/update your `.env.local` file with:

```bash
CALENDLY_ACCESS_TOKEN=your_access_token_here
CALENDLY_ORG_URI=https://api.calendly.com/organizations/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
CALENDLY_USER_URI=https://api.calendly.com/users/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
WEBHOOK_URL=https://yourdomain.com/api/calendly-webhook

# Optional: Secret key for webhook signature verification
CALENDLY_SIGNING_KEY=your_signing_key_here
```

## Step 4: Register the Webhook

Run the setup script:

```bash
node scripts/setup-calendly-webhook.js
```

This will:
- Register your webhook with Calendly
- Configure it to receive `invitee.created` and `invitee.canceled` events
- Provide you with a webhook ID for reference

## Verification

Once the webhook is registered:

1. **Test locally** (if using ngrok):
   - Use ngrok to expose your local server: `ngrok http 3000`
   - The webhook URL would be: `https://your-ngrok-url.ngrok.io/api/calendly-webhook`

2. **Test in production**:
   - Book a meeting on your Calendly event
   - The webhook should receive the event
   - Check your server logs for: `=== CALENDLY WEBHOOK RECEIVED ===`
   - An email should be sent to your team notification email

## Webhook Payload Structure

The webhook sends JSON in Calendly v2 API format:

```json
{
  "event": "invitee.created",
  "resource": {
    "uri": "https://api.calendly.com/invitees/XXXXX",
    "email": "user@example.com",
    "name": "User Name",
    "scheduling_url": "https://calendly.com/meeting_url",
    "questions_and_answers": [
      {
        "question": "What is your Meeting ID?",
        "answer": "ID123456"
      }
    ]
  }
}
```

## Troubleshooting

### Webhook not being called

1. Verify the webhook URL is publicly accessible
2. Check that your domain is correct in `WEBHOOK_URL`
3. Verify the webhook is registered in Calendly (check API response)

### Webhook received but email not sent

Check server logs for:
- `=== CALENDLY WEBHOOK RECEIVED ===` - Webhook arrived
- `=== NO CONVERSATION FOUND ===` - Conversation not found in database
- `=== SENDING EMAIL NOTIFICATION ===` - Email being sent
- `=== EMAIL RESULT ===` - Email result

Common issues:
- User entered wrong Meeting ID
- Email address doesn't match conversation
- Conversation not marked as `is_completed` in database

### Webhook Signature Verification

If you provided a `signing_key`, Calendly includes an `X-Calendly-Signature` header. To verify:

```bash
HMAC-SHA256(signing_key, request_body) == X-Calendly-Signature header
```

The signature verification code is commented in `/api/calendly-webhook/route.ts`.

## Need Help?

- Calendly API Docs: https://developer.calendly.com
- Webhook Documentation: https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM4-webhook-signatures
