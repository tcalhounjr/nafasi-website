#!/usr/bin/env node

/**
 * Setup Calendly Webhook Subscription
 *
 * This script registers a webhook with Calendly to receive invitee.created events
 *
 * Required environment variables:
 * - CALENDLY_ACCESS_TOKEN: Personal access token from https://calendly.com/integrations/api_tokens
 * - CALENDLY_ORG_URI: Organization URI (https://api.calendly.com/organizations/XXXXX)
 * - CALENDLY_USER_URI: User URI (https://api.calendly.com/users/XXXXX)
 * - WEBHOOK_URL: Your webhook URL (e.g., https://yourdomain.com/api/calendly-webhook)
 * - CALENDLY_SIGNING_KEY: (Optional) Secret key for webhook signature verification
 */

const https = require('https');

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed)}`));
          }
        } catch (e) {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function setupWebhook() {
  const accessToken = process.env.CALENDLY_ACCESS_TOKEN;
  const orgUri = process.env.CALENDLY_ORG_URI;
  const userUri = process.env.CALENDLY_USER_URI;
  const webhookUrl = process.env.WEBHOOK_URL;
  const signingKey = process.env.CALENDLY_WEBHOOK_SECRET || process.env.CALENDLY_SIGNING_KEY;

  if (!accessToken) {
    console.error('❌ CALENDLY_ACCESS_TOKEN is required');
    console.log('Get it from: https://calendly.com/integrations/api_tokens');
    process.exit(1);
  }

  if (!orgUri || !userUri) {
    console.error('❌ CALENDLY_ORG_URI and CALENDLY_USER_URI are required');
    console.log('You can find these by calling: curl -H "Authorization: Bearer YOUR_TOKEN" https://api.calendly.com/users/me');
    process.exit(1);
  }

  if (!webhookUrl) {
    console.error('❌ WEBHOOK_URL is required');
    console.log('Example: https://yourdomain.com/api/calendly-webhook');
    process.exit(1);
  }

  console.log('Setting up Calendly webhook subscription...\n');
  console.log('Configuration:');
  console.log(`  Organization: ${orgUri}`);
  console.log(`  User: ${userUri}`);
  console.log(`  Webhook URL: ${webhookUrl}`);
  console.log(`  Events: invitee.created, invitee.canceled`);
  if (signingKey) console.log(`  Signing Key: ${signingKey.substring(0, 10)}...`);
  console.log('\n');

  const payload = {
    url: webhookUrl,
    events: ['invitee.created', 'invitee.canceled'],
    organization: orgUri,
    user: userUri,
    scope: 'user'
  };

  if (signingKey) {
    payload.signing_key = signingKey;
  }

  const options = {
    hostname: 'api.calendly.com',
    path: '/webhook_subscriptions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Nafasi-Webhook-Setup/1.0'
    }
  };

  try {
    console.log('📤 Sending webhook registration request...');
    const response = await makeRequest(options, payload);

    console.log('✅ Webhook subscription created successfully!\n');
    console.log('Response:');
    console.log(JSON.stringify(response, null, 2));

    if (response.resource && response.resource.uuid) {
      console.log(`\n📋 Webhook ID: ${response.resource.uuid}`);
    }
  } catch (error) {
    console.error('❌ Error creating webhook subscription:');
    console.error(error.message);
    process.exit(1);
  }
}

setupWebhook();
