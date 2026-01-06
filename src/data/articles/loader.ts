import { Article } from '../articles';

// Dynamically import all article files from the articles directory
const articleModules = import.meta.glob<{ article: Article }>('./*.ts', { eager: true });

// Extract articles from modules and sort by created_at (newest first)
export const loadedArticles: Article[] = Object.values(articleModules)
  .filter(module => module.article && module.article.id) // Ensure it has article data
  .map(module => module.article)
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
