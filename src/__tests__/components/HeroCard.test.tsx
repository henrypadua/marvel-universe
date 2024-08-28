import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { HeroCard } from '@/components/HeroCard'

import { useFavorite } from '@/hooks/useFavorite'

import { charactersMock } from '@/__mocks__/character'

jest.mock('@/hooks/useFavorite')

const mockHero = charactersMock.data.results[0]

describe('HeroCard component', () => {
  it('renders hero name and image', () => {
    const handleSetFavoritesMock = jest.fn()
    ;(useFavorite as jest.Mock).mockReturnValue({
      handleSetFavorites: handleSetFavoritesMock,
      favorites: [],
    })

    render(<HeroCard hero={mockHero} />)
    const nameElement = screen.getByText('Hulk')
    const imageElement = screen.getByAltText('Hulk')

    expect(nameElement).toBeInTheDocument()
    expect(imageElement).toBeInTheDocument()
  })

  it('calls handleSetFavorites when favorite button is clicked', () => {
    const handleSetFavoritesMock = jest.fn()
    ;(useFavorite as jest.Mock).mockReturnValue({
      handleSetFavorites: handleSetFavoritesMock,
      favorites: [],
    })

    render(<HeroCard hero={mockHero} />)
    const favoriteButton = screen.getByTestId('favorite-button')
    fireEvent.click(favoriteButton)
    expect(handleSetFavoritesMock).toHaveBeenCalledWith(mockHero)
  })

  it('navigates to hero detail page when clicked', () => {
    const pushMock = jest.fn()
    const handleSetFavoritesMock = jest.fn()
    ;(useFavorite as jest.Mock).mockReturnValue({
      handleSetFavorites: handleSetFavoritesMock,
      favorites: [],
    })
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })

    render(<HeroCard hero={mockHero} />)
    const heroCard = screen.getByTestId('hero')
    fireEvent.click(heroCard)
    expect(pushMock).toHaveBeenCalledWith(
      `/detalhe-heroi?id=${mockHero.id}`,
      `/detalhe-heroi`,
    )
  })

  it('renders the correct favorite icon when hero is in favorites', () => {
    const handleSetFavoritesMock = jest.fn()
    ;(useFavorite as jest.Mock).mockReturnValue({
      handleSetFavorites: handleSetFavoritesMock,
      favorites: [mockHero],
    })

    render(<HeroCard hero={mockHero} />)
    const favoriteIcon = screen.getByAltText('Favorito')
    expect(favoriteIcon).toHaveAttribute('src', '/assets/favorito_01.svg')
  })
})
