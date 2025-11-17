#!/usr/bin/env node

/**
 * Update Calendly Webhook Subscription with Signing Key
 *
 * This script updates an existing webhook subscription to include a signing key
 *
 * Run with: CALENDLY_ACCESS_TOKEN=... CALENDLY_WEBHOOK_SECRET=... node scripts/update-webhook-signing-key.js
 */

const https = require('https')

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body)
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed)
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed)}`))
          }
        } catch (e) {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`))
        }
      })
    })

    req.on('error', reject)
    if (data) req.write(JSON.stringify(data))
    req.end()
  })
}

async function updateWebhook() {
  const accessToken = process.env.CALENDLY_ACCESS_TOKEN
  const webhookSecret = process.env.CALENDLY_WEBHOOK_SECRET
  const webhookUrl = process.env.WEBHOOK_URL
  const orgUri = process.env.CALENDLY_ORG_URI
  const userUri = process.env.CALENDLY_USER_URI

  if (!accessToken || !webhookSecret || !webhookUrl || !orgUri || !userUri) {
    console.error('❌ Missing required environment variables')
    console.log('Required: CALENDLY_ACCESS_TOKEN, CALENDLY_WEBHOOK_SECRET, WEBHOOK_URL, CALENDLY_ORG_URI, CALENDLY_USER_URI')
    process.exit(1)
  }

  console.log('📋 Step 1: Listing existing webhook subscriptions...\n')

  const listOptions = {
    hostname: 'api.calendly.com',
    path: `/webhook_subscriptions?organization=${encodeURIComponent(orgUri)}&user=${encodeURIComponent(userUri)}&scope=user`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  }

  try {
    const listResponse = await makeRequest(listOptions)
    const webhooks = listResponse.collection || []

    if (webhooks.length === 0) {
      console.log('❌ No existing webhooks found. Create one first using setup-calendly-webhook.js')
      process.exit(1)
    }

    console.log(`Found ${webhooks.length} webhook(s):`)
    webhooks.forEach((wh, i) => {
      console.log(`  ${i + 1}. ${wh.uri}`)
      console.log(`     URL: ${wh.callback_url}`)
      console.log(`     Events: ${wh.events.join(', ')}`)
    })

    // Delete old webhooks and create new one
    console.log('\n📋 Step 2: Deleting old webhook subscriptions...\n')

    for (const webhook of webhooks) {
      const webhookId = webhook.uri.split('/').pop()
      const deleteOptions = {
        hostname: 'api.calendly.com',
        path: `/webhook_subscriptions/${webhookId}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }

      try {
        await makeRequest(deleteOptions)
        console.log(`✅ Deleted webhook: ${webhookId}`)
      } catch (error) {
        console.error(`❌ Error deleting webhook ${webhookId}:`, error.message)
      }
    }

    console.log('\n📋 Step 3: Creating new webhook with signing key...\n')

    const payload = {
      url: webhookUrl,
      events: ['invitee.created', 'invitee.canceled'],
      organization: orgUri,
      user: userUri,
      scope: 'user',
      signing_key: webhookSecret
    }

    const createOptions = {
      hostname: 'api.calendly.com',
      path: '/webhook_subscriptions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }

    const createResponse = await makeRequest(createOptions, payload)

    console.log('✅ Webhook subscription updated successfully!\n')
    console.log('Configuration:')
    console.log(`  URL: ${webhookUrl}`)
    console.log(`  Events: invitee.created, invitee.canceled`)
    console.log(`  Signing Key: ${webhookSecret.substring(0, 10)}...`)
    console.log(`  Webhook ID: ${createResponse.resource.uuid}`)
    console.log('\n✅ Webhook security is now enabled!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

updateWebhook()
