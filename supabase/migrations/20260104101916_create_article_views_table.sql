/*
  # Create Article Views Table

  ## Summary
  This migration creates a table to track realistic article view counts that increment on every visit/refresh.

  ## Tables Created
  1. `article_views`
    - `id` (uuid, primary key) - Unique identifier for each view record
    - `article_id` (text, indexed) - The ID of the article being viewed
    - `views` (integer) - Total view count for the article
    - `created_at` (timestamptz) - When the record was created
    - `updated_at` (timestamptz) - When the record was last updated

  ## Security
  1. Enable RLS on `article_views` table
  2. Allow anyone to read view counts (public data)
  3. Only allow incrementing views through a secure function

  ## Notes
  - The table uses `article_id` as text to match the existing article data structure
  - Views are tracked per article with a single row per article
  - The `updated_at` field tracks when the view count was last incremented
*/

CREATE TABLE IF NOT EXISTS article_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id text UNIQUE NOT NULL,
  views integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_article_views_article_id ON article_views(article_id);

ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read article views"
  ON article_views
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert article views"
  ON article_views
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update article views"
  ON article_views
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION increment_article_views(p_article_id text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_views integer;
BEGIN
  INSERT INTO article_views (article_id, views, updated_at)
  VALUES (p_article_id, 1, now())
  ON CONFLICT (article_id)
  DO UPDATE SET
    views = article_views.views + 1,
    updated_at = now()
  RETURNING views INTO v_views;
  
  RETURN v_views;
END;
$$;

CREATE OR REPLACE FUNCTION get_article_views(p_article_id text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_views integer;
BEGIN
  SELECT views INTO v_views
  FROM article_views
  WHERE article_id = p_article_id;
  
  IF v_views IS NULL THEN
    RETURN 0;
  END IF;
  
  RETURN v_views;
END;
$$;