-- Streamline conversations table for Calendly integration
-- This migration adds fields for Calendly webhook integration and meeting tracking

ALTER TABLE conversations
-- Add streamlined lead data field (project description replaces location for better pre-meeting prep)
ADD COLUMN IF NOT EXISTS project_description TEXT,

-- Add Calendly-specific fields
ADD COLUMN IF NOT EXISTS calendly_meeting_url TEXT,
ADD COLUMN IF NOT EXISTS calendly_meeting_created_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS calendly_meeting_scheduled_time TIMESTAMP WITH TIME ZONE,

-- Rename columns for clarity (old names stay for backward compatibility)
-- New boolean to track if meeting was scheduled
ADD COLUMN IF NOT EXISTS meeting_scheduled BOOLEAN DEFAULT false,

-- Webhook event tracking
ADD COLUMN IF NOT EXISTS last_webhook_event JSONB;

-- Create index for faster lookups of meetings that need follow-up
CREATE INDEX IF NOT EXISTS idx_conversations_meeting_scheduled ON conversations(meeting_scheduled, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_email_for_followup ON conversations(email, meeting_scheduled);

-- Add check constraint to ensure email is provided before marking as qualified
ALTER TABLE conversations
ADD CONSTRAINT check_email_if_qualified CHECK (
  NOT is_qualified OR email IS NOT NULL
);
