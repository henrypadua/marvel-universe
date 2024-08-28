import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDebounce } from '@uidotdev/usehooks'

import { HeroList } from '@/components/HeroList'

import { useFavorite } from '@/hooks/useFavorite'

import { useGetCharacters } from '@/services/useGetCharacters'

import '@testing-library/jest-dom'

import { charactersMock } from '@/__mocks__/character'

jest.mock('@/services/useGetCharacters')
jest.mock('@/hooks/useFavorite')
jest.mock('@uidotdev/usehooks')

const mockHeroes = charactersMock.data.results

describe('HeroList component', () => {
  beforeEach(() => {
    ;(useGetCharacters as jest.Mock).mockReturnValue({
      data: charactersMock.data,
      isLoading: false,
    })
    ;(useFavorite as jest.Mock).mockReturnValue({ favorites: [] })
    ;(useDebounce as jest.Mock).mockImplementation((value) => value)
  })

  it('renders heroes list correctly', async () => {
    render(<HeroList />)

    await waitFor(() => {
      mockHeroes.forEach((hero) => {
        expect(screen.getByTestId(`hero-card-${hero.id}`)).toBeInTheDocument()
      })
    })
  })

  it('renders loader while loading', () => {
    ;(useGetCharacters as jest.Mock).mockReturnValue({ isLoading: true })
    render(<HeroList />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('renders pagination when not showing favorites', async () => {
    render(<HeroList />)
    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument()
    })
  })

  it('filters heroes by search term', async () => {
    render(<HeroList />)

    const searchBar = screen.getByTestId('search-bar')

    await userEvent.type(searchBar, 'Spider')

    await waitFor(() => {
      expect(screen.getByTestId('hero-card-1009351')).toBeInTheDocument()
      expect(screen.queryByTestId('hero-card-2')).not.toBeInTheDocument()
      expect(screen.queryByTestId('hero-card-3')).not.toBeInTheDocument()
    })
  })

  it('toggles between all heroes and favorites', async () => {
    ;(useFavorite as jest.Mock).mockReturnValue({ favorites: [mockHeroes[0]] })
    render(<HeroList />)
    const toggle = screen.getByTestId('toggle')

    await waitFor(() => {
      mockHeroes.forEach((hero) => {
        expect(screen.getByTestId(`hero-card-${hero.id}`)).toBeInTheDocument()
      })
    })

    fireEvent.click(toggle)

    await waitFor(() => {
      expect(screen.getByTestId('hero-card-1009351')).toBeInTheDocument()
      expect(screen.queryByTestId('hero-card-2')).not.toBeInTheDocument()
      expect(screen.queryByTestId('hero-card-3')).not.toBeInTheDocument()
    })
  })

  it('sorts heroes by name', async () => {
    render(<HeroList />)
    const select = screen.getByTestId('order-by')

    await userEvent.selectOptions(select, 'name')

    await waitFor(() => {
      expect(screen.getByTestId('hero-card-1009351')).toBeInTheDocument()
      expect(screen.queryByTestId('hero-card-1009144')).not.toBeInTheDocument()
    })
  })

  it('calculates numberOfPages correctly with different totalData values', async () => {
    jest.clearAllMocks()
    ;(useGetCharacters as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    })

    render(<HeroList />)

    await waitFor(() => {
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
    })
  })
})
