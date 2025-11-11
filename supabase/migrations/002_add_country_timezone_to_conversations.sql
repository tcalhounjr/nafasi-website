-- Add country and timezone columns to conversations table
ALTER TABLE conversations
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS timezone TEXT;
