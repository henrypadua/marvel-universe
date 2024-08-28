import { act, render, renderHook } from '@testing-library/react'
import i18next from 'i18next'

import { LanguageProvider, useLanguage } from '@/hooks/useLanguage'

beforeEach(() => {
  i18next.init()
})

const ComponentUnderTest = () => {
  const { language } = useLanguage()

  return <div>{language}</div>
}

type Props = {
  children: React.ReactNode
}

describe('Hooks: useLanguage', () => {
  const changeLanguage = jest.spyOn(i18next, 'changeLanguage')
  const languageStorage = jest.spyOn(Storage.prototype, 'getItem')
  const setItem = jest.spyOn(Storage.prototype, 'setItem')

  afterEach(() => {
    languageStorage.mockRestore()
    changeLanguage.mockRestore()
    setItem.mockRestore()

    jest.resetAllMocks()
  })

  test('should use default language when languageStorage is null', async () => {
    const { container } = render(
      <LanguageProvider>
        <ComponentUnderTest />
      </LanguageProvider>,
    )

    expect(container.textContent).toBe('en-US')
  })

  test('should get initial language from localStorage', () => {
    localStorage.setItem('language', 'pt-BR')
    const wrapper = ({ children }: Props) => (
      <LanguageProvider>{children}</LanguageProvider>
    )
    const { result } = renderHook(() => useLanguage(), { wrapper })

    expect(result.current.language).toEqual('pt-BR')
  })

  test('should set language', () => {
    const wrapper = ({ children }: Props) => (
      <LanguageProvider>{children}</LanguageProvider>
    )
    const { result } = renderHook(() => useLanguage(), { wrapper })
    act(() => {
      result.current.setLanguage('es-ES')
    })

    expect(result.current.language).toEqual('es-ES')
    expect(localStorage.getItem('language')).toEqual('es-ES')
    expect(i18next.language).toEqual('es')
  })

  test('should language is empty', () => {
    const wrapper = ({ children }: Props) => (
      <LanguageProvider>{children}</LanguageProvider>
    )
    const { result } = renderHook(() => useLanguage(), { wrapper })

    act(() => {
      result.current.setLanguage(null)
    })

    expect(result.current.language).toBeNull()
  })
})
