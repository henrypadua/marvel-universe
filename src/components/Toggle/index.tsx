import { useTranslation } from 'react-i18next'
import Image from 'next/image'

type ToggleProps = {
  onChange: () => void
}

export function Toggle({ onChange }: Readonly<ToggleProps>) {
  const { t } = useTranslation()
  return (
    <label
      className="inline-flex cursor-pointer flex-wrap items-center gap-9"
      data-testid="toggle"
    >
      <input
        type="checkbox"
        value=""
        onChange={onChange}
        className="peer sr-only"
      />

      <div className="after:peer relative h-7 w-14 rounded-full bg-gray-200 after:absolute after:start-2 after:top-[6px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:duration-300 after:ease-in-out after:content-[''] peer-checked:after:translate-x-[calc(100%+10px)] peer-checked:after:bg-marvel peer-checked:after:shadow-red peer-focus:outline-none" />

      <span className="flex items-center gap-4">
        <Image
          width={18}
          height={18}
          src="/assets/favorito_01.svg"
          alt={t('components.toggle.label')}
          title={t('components.toggle.label')}
          priority
        />
        <span className="text-rose-400">{t('components.toggle.label')}</span>
      </span>
    </label>
  )
}
