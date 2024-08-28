import Select from 'react-select'
import Image from 'next/image'

import { useLanguage } from '@/hooks/useLanguage'

type language = {
  value: string
  label: string
}

export function LanguageSelect({
  languages,
}: Readonly<{ languages: language[] | undefined }>) {
  const { language, setLanguage } = useLanguage()

  const flagImages: { [key: string]: string } = {
    'en-US': `https://flagsapi.com/US/shiny/64.png`,
    'pt-BR': `https://flagsapi.com/BR/shiny/64.png`,
    'es-ES': `https://flagsapi.com/ES/shiny/64.png`,
  }

  const options = languages?.map((language) => ({
    value: language.value,
    label: language.label,
    image: flagImages[language.value],
  }))

  const formatOptionLabel = ({
    label,
    image,
  }: {
    label: string
    image: string
  }) => (
    <div className="flex items-center">
      <Image
        src={image}
        alt={label}
        width={25}
        height={25}
        style={{ marginRight: '10px' }}
      />
      {label.toUpperCase()}
    </div>
  )

  return (
    <Select
      value={options?.find((option) => option.value === language)}
      isLoading={!languages}
      isSearchable={false}
      placeholder=""
      options={options}
      name="language-select"
      inputId="language-select"
      onChange={(selectedOption) => {
        setLanguage(selectedOption?.value as string)
      }}
      formatOptionLabel={formatOptionLabel}
      styles={{
        container: (provided) => ({
          ...provided,
          width: '200px',
          marginLeft: '20px',
        }),
        control: (provided) => ({
          ...provided,
          border: 'none',
          boxShadow: 'none',
          cursor: 'pointer',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          cursor: 'pointer',
          padding: 0 + ' !important',
          svg: {
            color: '#000',
          },
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#0E0E0E',
          textTransform: 'uppercase',
        }),
      }}
    />
  )
}
