import { useTranslation } from 'react-i18next'
import Image from 'next/image'

import { Container } from '../Container'
import { LanguageSelect } from '../LanguageSelect'

export function HeaderHome() {
  const { t } = useTranslation()

  const languages = [
    { value: 'en-US', label: t('languages.english') },
    { value: 'pt-BR', label: t('languages.portuguese') },
    { value: 'es-ES', label: t('languages.spanish') },
  ]
  return (
    <header className="py-7" data-testid="header-home">
      <LanguageSelect languages={languages} />
      <Container>
        <Image
          src="/assets/logo.svg"
          alt="Marvel Logo"
          className="mx-auto h-28 w-full max-w-80"
          width={280}
          height={200}
          priority
        />

        <h1 className="mt-5 text-center text-3xl font-bold tracking-wider text-gray-700">
          {t('listPage.title')}
        </h1>

        <h6 className="text-md mt-2 text-center text-gray-500">
          {t('listPage.subtitle')}
        </h6>
      </Container>
    </header>
  )
}
