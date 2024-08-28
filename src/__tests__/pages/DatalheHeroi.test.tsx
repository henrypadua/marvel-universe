import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'

import HeroDetail from '@/pages/detalhe-heroi'

import { useFavorite } from '@/hooks/useFavorite'

import { useGetComics } from '@/services/useGetComics'
import { useGetDetailCharacter } from '@/services/useGetDetailCharacter'

import '@testing-library/jest-dom'

import { heroDetail } from '@/__mocks__/characterDetail'
import { comicsMock } from '@/__mocks__/comics'

jest.mock('colorthief', () => {
  return jest.fn().mockImplementation(() => ({
    getColor: jest.fn().mockResolvedValue([100, 100, 100]),
  }))
})

jest.mock('@/services/useGetDetailCharacter')
jest.mock('@/services/useGetComics')

jest.mock('@/hooks/useFavorite')

const mockHero = heroDetail.data
const mockComics = comicsMock.data.results

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const HeroDetailWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <HeroDetail />
  </QueryClientProvider>
)

describe('HeroDetail page', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      query: { id: '1009610' },
    })
    ;(useGetDetailCharacter as jest.Mock).mockReturnValue({
      data: mockHero,
      isLoading: false,
    })
    ;(useGetComics as jest.Mock).mockReturnValue({
      data: comicsMock.data,
      isLoading: false,
    })
    ;(useFavorite as jest.Mock).mockReturnValue({
      favorites: [],
      handleSetFavorites: jest.fn(),
    })
  })

  it('renders loader while loading', () => {
    ;(useGetDetailCharacter as jest.Mock).mockReturnValue({ isLoading: true })

    render(<HeroDetailWrapper />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('renders hero information correctly', async () => {
    render(<HeroDetailWrapper />)

    const heading = await screen.findAllByText('Hulk')

    await waitFor(() => {
      expect(heading[0]).toBeInTheDocument()
      expect(
        screen.getByText(
          'Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets.',
        ),
      ).toBeInTheDocument()
      expect(screen.getByTestId('info-hero')).toBeInTheDocument()

      mockComics.forEach((comic) => {
        expect(screen.getByText(comic.title)).toBeInTheDocument()
        expect(screen.getByAltText(comic.title)).toBeInTheDocument()
      })
    })
  })

  it('should call handleSetFavorites when favorite button is clicked', async () => {
    const handleSetFavoritesMock = jest.fn()
    ;(useFavorite as jest.Mock).mockReturnValue({
      handleSetFavorites: handleSetFavoritesMock,
      favorites: [],
    })

    render(<HeroDetailWrapper />)

    const favoriteButton = screen.getByTestId('favorite-button')

    fireEvent.click(favoriteButton)

    await waitFor(() => {
      expect(handleSetFavoritesMock).toHaveBeenCalledWith(mockHero.results[0])
    })
  })

  it('renders the correct favorite icon when hero is in favorites', () => {
    const handleSetFavoritesMock = jest.fn()
    ;(useFavorite as jest.Mock).mockReturnValue({
      handleSetFavorites: handleSetFavoritesMock,
      favorites: [mockHero.results[0]],
    })

    render(<HeroDetailWrapper />)
    const favoriteIcon = screen.getByAltText('Favorito')
    expect(favoriteIcon).toHaveAttribute('src', '/assets/favorito_01.svg')
  })
})
