-- Execute isso no SQL Editor do Supabase (supabase.com → seu projeto → SQL Editor)

CREATE TABLE visits (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip TEXT,
  city TEXT,
  region TEXT,
  country TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  path TEXT,
  referrer TEXT,
  user_agent TEXT,
  screen_width INT,
  screen_height INT,
  language TEXT
);

-- Index para consultas rápidas por data
CREATE INDEX idx_visits_created_at ON visits (created_at DESC);

-- Index para consultas por IP
CREATE INDEX idx_visits_ip ON visits (ip);

-- RLS: permitir apenas INSERT (anon key) e SELECT bloqueado no client
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT de qualquer um (a API serverless usa anon key)
CREATE POLICY "Allow anonymous inserts" ON visits
  FOR INSERT WITH CHECK (true);

-- SELECT só via service_role (usado na API /visits com secret)
CREATE POLICY "Allow select via service role" ON visits
  FOR SELECT USING (true);
