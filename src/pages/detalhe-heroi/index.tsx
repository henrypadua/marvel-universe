import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ColorThief from 'colorthief'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { AutoComplete } from '@/components/AutoComplete'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Loader } from '@/components/Loader'
import { InfoHero } from '@/components/modules/InfoHero'

import { useFavorite } from '@/hooks/useFavorite'

import { useGetComics } from '@/services/useGetComics'
import { useGetDetailCharacter } from '@/services/useGetDetailCharacter'

import { Character } from '@/interfaces/characters'

export default function HeroDetail() {
  const { t } = useTranslation()
  const router = useRouter()
  const { favorites, handleSetFavorites } = useFavorite()
  const [backgroundColor, setBackgroundColor] = useState(
    'rgba(156, 154, 148, 0.4)',
  )

  const { id } = router.query as { id: string }
  const { data, isLoading } = useGetDetailCharacter({
    characterId: id,
  })
  const { data: comics, isLoading: isLoadingComics } = useGetComics({
    characterId: id,
  })

  const hero = data?.results[0] as Character
  const comicsList = comics?.results

  const handleGetBackgroundColor = async (
    event: SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const colorThief = new ColorThief()
    const color = await colorThief.getColor(event.target, 25)

    setBackgroundColor(`rgba(${color.join(',')}, 0.4)`)
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor ?? 'rgba(156, 154, 148, 0.4)',
      }}
      className={`relative flex min-h-screen flex-col justify-center overflow-x-hidden`}
    >
      <Head>
        <title>Marvel Detail Hero</title>
      </Head>

      <header className="absolute top-0 w-full py-5 pb-9">
        <Container className="flex flex-wrap items-center">
          <Link href="/">
            <Image
              src="/assets/logo_menor.svg"
              alt="Marvel Logo"
              className="mr-20 w-full max-w-56"
              width={280}
              height={200}
              priority
            />
          </Link>

          <AutoComplete />
        </Container>
      </header>

      <main className="pb-28 pt-24">
        {isLoading || isLoadingComics ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {hero ? (
              <>
                <section className="pb-14">
                  <Container>
                    <div className="relative z-10 my-20 w-full max-w-[275px]">
                      <div className="mb-10 flex items-center justify-between">
                        <h1 className="m-0 text-[40px] font-extrabold uppercase text-gray-700">
                          {hero.name}
                        </h1>

                        <button
                          className="cursor-pointer outline-none"
                          onClick={() => handleSetFavorites(hero)}
                          data-testid="favorite-button"
                        >
                          <Image
                            src={`/assets/favorito_${
                              favorites?.some((fav) => fav.id === hero.id)
                                ? '01'
                                : '02'
                            }.svg`}
                            alt="Favorito"
                            width={30}
                            height={30}
                            priority
                          />
                        </button>
                      </div>

                      <Image
                        id="hero-image"
                        src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                        alt={hero.name}
                        className="relative left-0 top-0 z-20 mx-auto my-5 max-w-full translate-x-0 md:hidden"
                        onLoad={handleGetBackgroundColor}
                        width={220}
                        height={464}
                        priority
                      />

                      <p className="text-justify text-lg leading-7 text-gray-600">
                        {hero.description}
                      </p>

                      <InfoHero hero={hero} />
                    </div>

                    <Image
                      id="hero-image"
                      src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                      alt={hero.name}
                      className="absolute left-1/2 top-[190px] z-20 hidden max-w-[590px] -translate-x-1/4 md:block"
                      onLoad={handleGetBackgroundColor}
                      width={220}
                      height={464}
                      priority
                    />

                    <p className="absolute left-0 top-[300px] m-0 h-[690px] w-full cursor-default select-none overflow-hidden break-words text-center text-[150px] font-bold uppercase leading-[0.9] text-white opacity-20 md:top-[150px] md:text-[350px]">
                      {hero.name}
                    </p>
                  </Container>
                </section>

                <section>
                  <Container>
                    <h2 className="mb-16 text-2xl font-bold text-gray-700">
                      {t('detailsPage.latestComics')}
                    </h2>

                    <div className="mt-5 grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-6 md:gap-16">
                      {comicsList?.map((comic) => (
                        <div key={comic.id} className="flex flex-col">
                          <Image
                            src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                            alt={comic.title}
                            className="h-[225px] min-w-[150px] transform cursor-default rounded-sm shadow-lg transition-transform duration-300 hover:scale-110"
                            width={150}
                            height={225}
                            priority
                          />
                          <p className="mt-5 font-medium text-gray-950">
                            {comic.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Container>
                </section>
              </>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-2xl text-gray-600">
                  {t('detailsPage.notFound')}
                </p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
