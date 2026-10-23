import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://www.garudaorganizer.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/asset/asset-bg.jpg`;

const DEFAULT_DESCRIPTION =
  "Garuda Organizer adalah event organizer profesional di Jakarta untuk MICE, recruitment event, corporate hiring, digital services, dan aktivasi brand.";

const toAbsoluteUrl = value => {
  if (!value) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

const getCanonicalUrl = canonical => {
  if (canonical) return toAbsoluteUrl(canonical).replace(/\/$/, "") || SITE_URL;

  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const normalizedPath = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${SITE_URL}${normalizedPath}`;
};

const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Garuda Organizer",
  legalName: "PT Garuda Nusantara Kencana",
  url: SITE_URL,
  logo: `${SITE_URL}/GarudaWarna.png`,
  image: DEFAULT_OG_IMAGE,
  description: DEFAULT_DESCRIPTION,
  telephone: "+62-21-2123-1095",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Sarinah Building 12th Floor, Jl. M.H. Thamrin No.11, RT.8/RW.4, Gondangdia, Menteng",
    addressLocality: "Jakarta Pusat",
    addressRegion: "DKI Jakarta",
    addressCountry: "ID",
  },
  sameAs: [
    "https://www.instagram.com/eo_garudaorganizer",
    "https://www.youtube.com/@garudaorganizer_",
  ],
};

export default function SEO({
  title = "Garuda Organizer | Event Organizer Profesional Jakarta",
  meta_description = DEFAULT_DESCRIPTION,
  meta_keywords = "event organizer Jakarta, EO Jakarta, MICE Indonesia, event management",
  author = "Garuda Organizer",
  og_image = DEFAULT_OG_IMAGE,
  canonical,
  type = "website",
  noindex = false,
  schema,
}) {
  const canonicalUrl = getCanonicalUrl(canonical);
  const imageUrl = toAbsoluteUrl(og_image);
  const pageSchema = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}/#webpage`,
    url: canonicalUrl,
    name: title,
    description: meta_description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Garuda Organizer",
      url: SITE_URL,
      inLanguage: "id-ID",
    },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: imageUrl,
    inLanguage: "id-ID",
  };
  const additionalSchemas = !schema ? [] : Array.isArray(schema) ? schema : [schema];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, pageSchema, ...additionalSchemas],
  };

  return (
    <Helmet>
      <html lang="id" />
      <title>{title}</title>
      <meta name="description" content={meta_description} />
      <meta name="keywords" content={meta_keywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="Garuda Organizer" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={meta_description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${title} - Garuda Organizer`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={meta_description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${title} - Garuda Organizer`} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData).replace(/</g, "\\u003c")}
      </script>
    </Helmet>
  );
}
