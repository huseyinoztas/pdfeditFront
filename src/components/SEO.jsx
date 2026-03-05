import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'PDFEdit'
const BASE_URL  = 'https://pdfedit.com.tr'
const OG_IMAGE  = `${BASE_URL}/og-image.png`

function SEO({ title, description, canonical, schema }) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalUrl = `${BASE_URL}${canonical}`

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:locale"      content="tr_TR" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@pdfedittr" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={OG_IMAGE} />

      {/* ── Schema JSON-LD ── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
