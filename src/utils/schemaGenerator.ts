import { Article } from '../data/articles';

export function generateArticleSchema(article: Article, views: number, author: any, category: any) {
  const ratingCount = Math.floor(views * (0.6 + Math.random() * 0.15));
  const ratingValue = (4.5 + Math.random() * 0.5).toFixed(1);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.cover_image,
    "datePublished": article.created_at,
    "dateModified": article.updated_at,
    "author": {
      "@type": "Person",
      "name": author?.name || "Viser360 Team",
      "url": "https://viser360.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Viser360",
      "logo": {
        "@type": "ImageObject",
        "url": "https://viser360.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://viser360.com/article/${article.slug}`
    },
    "articleSection": category?.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": ratingCount.toString()
    }
  };

  return schema;
}
