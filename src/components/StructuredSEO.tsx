import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import { getStructuredData } from '../utils/structuredData'
import { getCurrentLang } from '../utils/getCurrentLang'

const StructuredSEO: React.FC = () => {
  useTranslation()
  const lang = getCurrentLang()

  const { websiteData, personData, projectData } = getStructuredData(lang)

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
      <script type="application/ld+json">{JSON.stringify(personData)}</script>
      {projectData.map((data, idx) => (
        <script key={projects[idx].id} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}

export default StructuredSEO
