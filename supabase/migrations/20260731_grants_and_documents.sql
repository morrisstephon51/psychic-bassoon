-- Grant matching tracker: grants + application documents
-- All DB ops go through server-side API routes (service role only)

CREATE TABLE IF NOT EXISTS public.grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  funder text NOT NULL,
  source text CHECK (source IN ('federal', 'state', 'foundation', 'private')),
  org text CHECK (org IN ('plug_ai', 'forming_paws', 'both')),
  amount_min integer,
  amount_max integer,
  deadline date,
  status text DEFAULT 'identified' CHECK (status IN ('identified','researching','drafting','submitted','awarded','rejected','watching')),
  fit_score integer CHECK (fit_score BETWEEN 0 AND 100),
  application_url text,
  requirements text,
  notes text,
  tags text[],
  slug text UNIQUE,
  last_checked_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.grants ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.grant_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id uuid REFERENCES public.grants(id) ON DELETE CASCADE,
  doc_type text CHECK (doc_type IN ('loi','narrative','budget','cover_letter','supporting')),
  content text NOT NULL,
  generated_at timestamptz DEFAULT now()
);

ALTER TABLE public.grant_documents ENABLE ROW LEVEL SECURITY;
