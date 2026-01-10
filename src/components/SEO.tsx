import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
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
  canonicalUrl,
  article
}: SEOProps) {
  const siteUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;
  
  // Ensure image URL is absolute
  const fullImageUrl = ogImage.startsWith('http') 
    ? ogImage 
    : `${siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Viser360" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Dublin Core (Optional but good for news) */}
      <meta name="DC.title" content={title} />
      <meta name="DC.description" content={description} />
      <meta name="DC.subject" content={keywords.join(', ')} />

      {/* Article Specific Metadata */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.tags && article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
}
