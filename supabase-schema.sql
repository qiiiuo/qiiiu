-- Guestbook table
CREATE TABLE IF NOT EXISTS guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  avatar TEXT,
  content TEXT NOT NULL CHECK (char_length(content) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guestbook_user_id ON guestbook(user_id);

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read messages
CREATE POLICY "Anyone can read guestbook messages"
  ON guestbook
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert messages
CREATE POLICY "Authenticated users can insert messages"
  ON guestbook
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Policy: Users can delete their own messages
CREATE POLICY "Users can delete own messages"
  ON guestbook
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- Optional: Create a function to delete old messages (run periodically)
CREATE OR REPLACE FUNCTION delete_old_messages()
RETURNS void AS $$
BEGIN
  DELETE FROM guestbook
  WHERE created_at < NOW() - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

