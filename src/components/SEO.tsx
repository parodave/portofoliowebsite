import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  descriptionKey?: string
  image?: string
  url?: string
  canonical?: string
}

const SITE_URL = 'https://karimhammouche.com'

const SEO: React.FC<SEOProps> = ({
  descriptionKey,
  image = '/vite.svg',
  url,
  canonical,
}) => {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  const baseUrl = url || `${SITE_URL}${pathname}`
  const canonicalUrl = canonical || baseUrl
  const frUrl = `${baseUrl}?lang=fr`
  const enUrl = `${baseUrl}?lang=en`

  const title = 'Karim Hammouche'
  const description = descriptionKey
    ? t(descriptionKey)
    : 'Portfolio de Karim Hammouche, développeur créatif et entrepreneur.'

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang pour le multilingue */}
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:image" content={image} />

      {/* Langue et direction (RTL si arabe) */}
      <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />
    </Helmet>
  )
}

export default SEO
