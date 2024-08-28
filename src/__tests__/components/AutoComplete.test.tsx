import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AutoComplete } from '@/components/AutoComplete'

import { useGetCharacters } from '@/services/useGetCharacters'

import { charactersMock } from '@/__mocks__/character'

jest.mock('@/services/useGetCharacters')

describe('AutoComplete Component', () => {
  beforeEach(() => {
    ;(useGetCharacters as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    })
  })

  it('renders input field and search icon', () => {
    render(<AutoComplete />)
    const input = screen.getByPlaceholderText(
      'components.searchBar.placeholder',
    )
    const searchIcon = screen.getByAltText('Buscar')

    expect(input).toBeInTheDocument()
    expect(searchIcon).toBeInTheDocument()
  })

  it('displays loading indicator when fetching data', () => {
    ;(useGetCharacters as jest.Mock).mockReturnValue({
      data: { results: charactersMock.data },
      isLoading: true,
    })

    render(<AutoComplete />)

    const loadingIcon = screen.getByTestId('loading')
    expect(loadingIcon).toBeInTheDocument()
  })

  it('displays suggestions after typing', async () => {
    ;(useGetCharacters as jest.Mock).mockReturnValue({
      data: charactersMock.data,
      isLoading: false,
    })

    render(<AutoComplete />)

    const input = screen.getByPlaceholderText(
      'components.searchBar.placeholder',
    )

    await userEvent.type(input, 'spider')

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument()
      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(charactersMock.data.results.length)
    })
  })

  it('closes suggestions list when clicking on an item', async () => {
    ;(useGetCharacters as jest.Mock).mockReturnValue({
      data: charactersMock.data,
      isLoading: false,
    })

    render(<AutoComplete />)
    const input = screen.getByPlaceholderText(
      'components.searchBar.placeholder',
    )

    await userEvent.type(input, 'spider')

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    const firstItem = screen.getAllByTestId('character-link')[0]
    userEvent.click(firstItem)

    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })

  it('when no results match', async () => {
    ;(useGetCharacters as jest.Mock).mockResolvedValue({
      data: [],
      isLoading: false,
    })

    render(<AutoComplete />)
    const input = screen.getByPlaceholderText(
      'components.searchBar.placeholder',
    )

    await userEvent.type(input, 'inexistente')

    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })

  it('clears suggestions when input is less than 1 character', async () => {
    ;(useGetCharacters as jest.Mock).mockReturnValue({
      data: charactersMock.data,
      isLoading: false,
    })

    render(<AutoComplete />)
    const input = screen.getByPlaceholderText(
      'components.searchBar.placeholder',
    )

    await userEvent.type(input, 'spider')

    await userEvent.type(input, '{backspace}', {
      initialSelectionStart: 0,
      initialSelectionEnd: 6,
    })

    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })
})
