import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
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
  keywords = ['Technology', 'Tech News', 'AI', 'Web3', 'Cybersecurity', 'Visernic', 'Innovation'],
  ogImage = '/viser360-og-default.jpg',
  ogType = 'website',
  article
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      // Handle Dublin Core tags which use 'name' but typically start with DC.
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Standard SEO
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', window.location.origin + ogImage, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:site_name', 'Viser360', true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', window.location.origin + ogImage);

    // Dublin Core (Dynamic)
    updateMetaTag('DC.title', title);
    updateMetaTag('DC.description', description);
    updateMetaTag('DC.subject', keywords.join(', '));
    
    if (article) {
      updateMetaTag('article:published_time', article.publishedTime || '', true);
      updateMetaTag('article:modified_time', article.modifiedTime || '', true);
      updateMetaTag('DC.date', article.publishedTime || '');
      
      if (article.author) {
        updateMetaTag('article:author', article.author, true);
        updateMetaTag('DC.creator', article.author);
      }
      
      // Handle article tags separately if needed, generally keywords cover DC.subject
    }
  }, [title, description, keywords, ogImage, ogType, article]);

  return null;
}
