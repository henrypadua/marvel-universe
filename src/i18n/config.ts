import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

export const LANGUAGES = ['en', 'pt']

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return import(`./locales/${language}/${namespace}.json`)
    }),
  )
  .init({
    debug: true,
    fallbackLng: {
      default: ['en'],
    },
    interpolation: {
      escapeValue: false,
    },
  })
