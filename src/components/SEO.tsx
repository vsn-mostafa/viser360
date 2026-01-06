import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

export default function SEO({
  title = 'Viser360 - Latest Technology News & Insights',
  description = 'Stay updated with cutting-edge tech news, insights, and innovations shaping our digital future. Expert analysis on AI, Web3, Cybersecurity, and more.',
  ogImage = '/assets/images/seo/viser360-og-default.jpg',
  ogType = 'website',
  article
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    updateMetaTag('description', description);

    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', window.location.origin + ogImage, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:site_name', 'Viser360', true);

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', window.location.origin + ogImage);

    if (article) {
      updateMetaTag('article:published_time', article.publishedTime || '', true);
      updateMetaTag('article:modified_time', article.modifiedTime || '', true);
      if (article.author) {
        updateMetaTag('article:author', article.author, true);
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          const element = document.createElement('meta');
          element.setAttribute('property', 'article:tag');
          element.setAttribute('content', tag);
          document.head.appendChild(element);
        });
      }
    }
  }, [title, description, ogImage, ogType, article]);

  return null;
}
