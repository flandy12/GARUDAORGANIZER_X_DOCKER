import { Helmet } from "react-helmet-async";

export default function SEO({title, meta_description, meta_keywords, author, url , og_image, canonical}) {
return (
<Helmet>
    <meta property="og:title" content={title} />

    <meta property="og:description" content={meta_description} />
    <meta property="og:url" content={url} />
  
    <meta name="author" content={author} />
    <meta name="description" content={meta_description} />
    <meta name="keywords" content={meta_keywords} itemprop="keywords" />
    <link rel="canonical" href={canonical} />
    <title>{title}</title>
</Helmet>
)}