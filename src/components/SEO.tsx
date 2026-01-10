import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  schema?: Record<string, any>;
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
  schema,
  article
}: SEOProps) {
  // Define the production domain to ensure strict canonicalization (Fixes WWW vs Non-WWW)
  const siteDomain = 'https://viser360.vercel.app';
  
  // Construct absolute URL for canonical tag
  const currentPath = window.location.pathname;
  const currentUrl = canonicalUrl || `${siteDomain}${currentPath === '/' ? '' : currentPath}`;
  
  // Ensure image URL is absolute
  const fullImageUrl = ogImage.startsWith('http') 
    ? ogImage 
    : `${siteDomain}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

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
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@viser360" />
      <meta name="twitter:creator" content="@viser360" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Robots Control */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

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

      {/* JSON-LD Schema Injection */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
