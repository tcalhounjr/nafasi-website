-- Create conversations table for AI chatbot lead qualification
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Lead information
  name TEXT,
  email TEXT,
  project_description TEXT,
  budget_range TEXT,
  timeline TEXT,

  -- Conversation data
  messages JSONB DEFAULT '[]'::jsonb NOT NULL,
  thread_id TEXT, -- OpenAI thread ID for Assistant API

  -- Status and qualification
  is_qualified BOOLEAN DEFAULT false,
  is_completed BOOLEAN DEFAULT false,

  -- Spam detection
  spam_score INTEGER DEFAULT 0,
  ip_address TEXT,
  user_agent TEXT,

  -- Metadata
  session_duration_seconds INTEGER,
  message_count INTEGER DEFAULT 0
);

-- Create index on created_at for efficient time-based queries
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);

-- Create index on email for lookup
CREATE INDEX IF NOT EXISTS idx_conversations_email ON conversations(email);

-- Create index on is_qualified for filtering qualified leads
CREATE INDEX IF NOT EXISTS idx_conversations_is_qualified ON conversations(is_qualified);

-- Create index on spam_score for filtering spam
CREATE INDEX IF NOT EXISTS idx_conversations_spam_score ON conversations(spam_score);

-- Create index on ip_address for rate limiting
CREATE INDEX IF NOT EXISTS idx_conversations_ip_address ON conversations(ip_address, created_at);

-- Enable Row Level Security
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the chatbot)
CREATE POLICY "Allow public inserts" ON conversations
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role to read all
CREATE POLICY "Allow service role to read all" ON conversations
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Create policy to allow service role to update all
CREATE POLICY "Allow service role to update all" ON conversations
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to increment message count
CREATE OR REPLACE FUNCTION increment_message_count()
RETURNS TRIGGER AS $$
BEGIN
  NEW.message_count = jsonb_array_length(NEW.messages);
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update message_count when messages change
CREATE TRIGGER update_message_count BEFORE INSERT OR UPDATE OF messages ON conversations
  FOR EACH ROW EXECUTE FUNCTION increment_message_count();
