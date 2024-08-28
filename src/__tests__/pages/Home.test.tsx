import { render, screen } from '@testing-library/react'

import Home from '@/pages/index'

import { FavoriteProvider } from '@/hooks/useFavorite'

import { useGetCharacters } from '@/services/useGetCharacters'

import '@testing-library/jest-dom'

import { charactersMock } from '@/__mocks__/character'

jest.mock('@/services/useGetCharacters')

function HomeWithProvider() {
  return (
    <FavoriteProvider>
      <Home />
    </FavoriteProvider>
  )
}

describe('Home page', () => {
  beforeEach(() => {
    ;(useGetCharacters as jest.Mock).mockReturnValue({
      data: charactersMock.data,
      isLoading: false,
    })
  })
  it('renders the layout correctly', () => {
    render(<HomeWithProvider />)

    expect(screen.getByTestId('header-home')).toBeInTheDocument()
    expect(screen.getByTestId('hero-list')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders the HeroList within a Container', () => {
    render(<HomeWithProvider />)
    const heroListElement = screen.getByTestId('hero-list')
    expect(heroListElement.parentElement?.tagName).toBe('DIV')
    expect(heroListElement.parentElement).toHaveClass(
      'container m-auto max-w-[1110px] px-5',
    )
  })
})
