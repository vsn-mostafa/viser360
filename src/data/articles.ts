import { author } from './author';
import { categories } from './categories';
import { loadedArticles } from './articles/loader';

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author_id: string;
  category_id: string;
  published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  seo_title?: string;
  seo_description?: string;
  og_image?: string;
}

// Articles are now dynamically loaded from individual files in the articles/ directory
// To add a new article, create a new .ts file in src/data/articles/ (not loader.ts) with an exported 'article' object
// The system will automatically detect and load it - no manual registration needed!
export const articles: Article[] = loadedArticles;

export const comments: Comment[] = [];

export function getArticleById(id: string) {
  return articles.find((article) => article.id === id);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categoryId: string) {
  return articles.filter((article) => article.category_id === categoryId && article.published);
}

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}

export function getAuthorById(id: string) {
  return id === '1' ? author : null;
}

export function addComment(comment: Omit<Comment, 'id' | 'created_at'>) {
  const newComment: Comment = {
    ...comment,
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
  };
  comments.push(newComment);
  return newComment;
}

export function getCommentsByArticleId(articleId: string) {
  return comments.filter((comment) => comment.article_id === articleId);
}

export function incrementArticleViews(articleId: string) {
  const article = articles.find((a) => a.id === articleId);
  if (article) {
    article.views += 1;
  }
}
