const SITE_URL = 'https://karimhammouche.com'

import { projects } from '../data/projects'

export const getStructuredData = (lang: 'fr' | 'en') => {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: 'Karim Hammouche | Portfolio',
    inLanguage: lang,
  }

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Karim Hammouche',
    url: SITE_URL,
  }

  const projectData = projects.map((p) => {
    const description = Array.isArray(p.description[lang])
      ? p.description[lang].join(' ')
      : p.description[lang]

    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: p.title[lang],
      description,
      image: p.image,
      ...(p.url ? { url: p.url } : {}),
    }
  })

  return { websiteData, personData, projectData }
}
