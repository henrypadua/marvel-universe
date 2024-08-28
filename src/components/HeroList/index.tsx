import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '@uidotdev/usehooks'
import Image from 'next/image'

import { useFavorite } from '@/hooks/useFavorite'

import { useGetCharacters } from '@/services/useGetCharacters'

import { Character } from '@/interfaces/characters'

import { HeroCard } from '../HeroCard'
import { Loader } from '../Loader'
import { Pagination } from '../Pagination'
import { SearchBar } from '../SearchBar'
import { Toggle } from '../Toggle'

const LIMIT = 20

export function HeroList() {
  const { t } = useTranslation()
  const { favorites } = useFavorite()

  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [showFavorites, setShowFavorites] = useState(false)

  const searchName = useDebounce(searchTerm, 500)

  const { data, isLoading, isPending, isFetching } = useGetCharacters({
    limit: LIMIT,
    offset,
    nameStartsWith: searchName,
    orderBy,
  })

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setOffset(0)
  }

  const handleOrderBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(event.target.value)
  }

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites)
  }

  const heroes = showFavorites
    ? favorites
    : data?.results ?? ([] as Character[])

  useEffect(() => {
    setTotalData(data?.total ?? 0)
  }, [data])

  return (
    <section data-testid="hero-list">
      <div className="my-10">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mt-20 flex w-full flex-row flex-wrap items-center justify-between gap-9">
        <p className="text-gray-300">
          {t('listPage.found', {
            total: showFavorites ? favorites.length : totalData,
          })}
        </p>

        <div className="flex flex-wrap items-center gap-9">
          <div className="flex items-center text-rose-400">
            <Image
              width={18}
              height={18}
              className="mr-2"
              src="/assets/ic_heroi.svg"
              alt={t('components.select.label1')}
              title={t('components.select.label1')}
              priority
            />

            <select
              data-testid="order-by"
              className="cursor-pointer outline-none"
              defaultValue={orderBy}
              onChange={handleOrderBy}
            >
              <option value="name">{t('components.select.label1')}</option>
              <option value="-name">{t('components.select.label2')}</option>
            </select>
          </div>

          <Toggle onChange={handleShowFavorites} />
        </div>
      </div>

      {isLoading || isPending || isFetching ? (
        <Loader />
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-8 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {heroes.map((hero) => (
            <HeroCard hero={hero} key={hero.id} />
          ))}
        </div>
      )}

      <div className="mt-20">
        {!showFavorites && heroes?.length > 0 && (
          <Pagination
            numberOfPages={Math.ceil(totalData / LIMIT)}
            limit={LIMIT}
            setOffset={setOffset}
            visiblePages={5}
          />
        )}
      </div>
    </section>
  )
}
