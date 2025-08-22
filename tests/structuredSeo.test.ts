import { describe, it, expect } from 'vitest'
import { getStructuredData } from '../src/utils/structuredData'
import { projects } from '../src/data/projects'

;(['en', 'fr'] as const).forEach((lang) => {
  describe(`getStructuredData (${lang})`, () => {
    it('returns joined description strings', () => {
      const { projectData } = getStructuredData(lang)
      projectData.forEach((data, idx) => {
        expect(typeof data.description).toBe('string')
        const expected = projects[idx].description[lang].join(' ')
        expect(data.description).toBe(expected)
      })
    })
  })
})
