import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type SearchBarProps = {
  onSearch: (searchTerm: string) => void
  className?: string
}

export function SearchBar({ onSearch, className }: Readonly<SearchBarProps>) {
  const { t } = useTranslation()
  return (
    <div
      className={twMerge(
        'm-auto flex max-w-[880px] items-center rounded-full bg-[#FDECEC] bg-cover bg-center bg-no-repeat px-6 py-4',
        className,
      )}
    >
      <span className="mr-10">
        <Image
          src="/assets/ic_busca.svg"
          alt="Buscar"
          title="Buscar"
          width={25}
          height={25}
          priority
        />
      </span>
      <input
        data-testid="search-bar"
        type="text"
        placeholder={t('components.searchBar.placeholder')}
        onChange={(event) => onSearch(event.target.value)}
        className="w-full bg-transparent tracking-wide placeholder-rose-400 outline-none"
      />
    </div>
  )
}
