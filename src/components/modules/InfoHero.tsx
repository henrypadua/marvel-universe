import { useTranslation } from 'react-i18next'
import Image from 'next/image'

import { Character } from '@/interfaces/characters'

type InfoHeroProps = {
  hero: Character
}

export function InfoHero({ hero }: Readonly<InfoHeroProps>) {
  const { t } = useTranslation()

  function generateRandomRating() {
    return Math.random() * (100 - 50) + 50
  }

  return (
    <div
      className="mt-9 flex flex-wrap content-center items-center"
      data-testid="info-hero"
    >
      <div className="basis-3/6">
        <p className="mb-3 text-sm text-gray-700">{t('detailsPage.comics')}</p>
        <div className="flex items-center">
          <Image
            src="/assets/ic_quadrinhos.svg"
            alt="Quadrinhos"
            className="mr-3"
            width={30}
            height={30}
            priority
          />
          <span className="text-md text-gray-600">
            {hero.comics.available.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      <div className="basis-3/6 pl-10">
        <p className="mb-3 text-sm text-gray-700">{t('detailsPage.movies')}</p>
        <div className="flex min-h-[33px] items-center">
          <Image
            src="/assets/ic_trailer.svg"
            alt="Filmes"
            className="mr-3"
            width={30}
            height={30}
            priority
          />
          <span className="text-md text-gray-600">
            {hero.events.available.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      <div className="mt-7 flex items-center">
        <p className="text-md mr-4 font-medium text-gray-600">Rating:</p>
        <span
          className="bg-clip-text text-xl"
          style={{
            backgroundImage: `linear-gradient(90deg, rgb(255, 21, 16) ${generateRandomRating()}%, rgb(255, 255, 255) ${100 - generateRandomRating()}%)`,
            WebkitTextFillColor: 'transparent',
          }}
        >
          ★★★★★
        </span>
      </div>

      <div className="mt-7 flex items-center">
        <p className="text-md mr-4 font-medium text-gray-600">
          {t('detailsPage.latestComics')}:
        </p>
        <span className="text-sm text-gray-600">
          {new Date(hero.modified)
            .toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
            .replace('de', '')}
        </span>
      </div>
    </div>
  )
}
