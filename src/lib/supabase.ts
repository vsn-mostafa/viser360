import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function incrementArticleViews(articleId: string): Promise<number> {
  const { data, error } = await supabase.rpc('increment_article_views', {
    p_article_id: articleId,
  });

  if (error) {
    console.error('Error incrementing views:', error);
    return 0;
  }

  return data || 0;
}

export async function getArticleViews(articleId: string): Promise<number> {
  const { data, error } = await supabase.rpc('get_article_views', {
    p_article_id: articleId,
  });

  if (error) {
    console.error('Error getting views:', error);
    return 0;
  }

  return data || 0;
}

export async function getAllArticleViews(): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('article_views')
    .select('article_id, views');

  if (error) {
    console.error('Error getting all views:', error);
    return {};
  }

  const viewsMap: Record<string, number> = {};
  data?.forEach((item) => {
    viewsMap[item.article_id] = item.views;
  });

  return viewsMap;
}
