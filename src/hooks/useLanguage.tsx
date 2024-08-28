import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import i18next from 'i18next'

type LanguageProviderProps = {
  children: React.ReactNode
}

type LanguageContextType = {
  language: string | null
  setLanguage: (language: string | null) => void
}

const LanguageContext = createContext({} as LanguageContextType)

function LanguageProvider({ children }: Readonly<LanguageProviderProps>) {
  const [language, setLanguage] = useState<string | null>(null)

  useEffect(() => {
    const languageStorage = localStorage.getItem('language')
    if (languageStorage) {
      setLanguage(languageStorage)
      i18next.changeLanguage(languageStorage.substring(0, 2))
    } else {
      setLanguage('en-US')
      i18next.changeLanguage('en')
    }
  }, [])

  useEffect(() => {
    if (language) {
      i18next.changeLanguage(language.substring(0, 2))
      localStorage.setItem('language', language)
    }
  }, [language])

  const values = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  )

  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLanguage() {
  const languageContext = useContext(LanguageContext)
  return languageContext
}

export { LanguageProvider, useLanguage }
