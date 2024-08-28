import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

import { FavoriteProvider } from '@/hooks/useFavorite'
import { LanguageProvider } from '@/hooks/useLanguage'

import { queryClient } from '@/libs/react-query'

import '@/i18n/config'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <FavoriteProvider>
          <Component {...pageProps} />
        </FavoriteProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}
