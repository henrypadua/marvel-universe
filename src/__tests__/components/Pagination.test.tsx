import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Pagination } from '@/components/Pagination'

describe('Pagination component', () => {
  const mockSetOffset = jest.fn()

  beforeEach(() => {
    mockSetOffset.mockClear()
  })

  it('renders no buttons when there are no pages', () => {
    render(
      <Pagination numberOfPages={0} limit={10} setOffset={mockSetOffset} />,
    )
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  it('renders correct number of page buttons based on visiblePages', () => {
    render(
      <Pagination
        numberOfPages={10}
        limit={10}
        visiblePages={3}
        setOffset={mockSetOffset}
      />,
    )
    const pageButtons = screen.queryAllByRole('button')
    expect(pageButtons).toHaveLength(4) // visiblePages = 3
  })

  it('correctly adjusts visible pages when clicking page buttons', async () => {
    render(
      <Pagination
        numberOfPages={10}
        limit={10}
        visiblePages={6}
        setOffset={mockSetOffset}
      />,
    )

    // Clica na página 5
    fireEvent.click(screen.getByTestId('page-button-5'))

    // Verifica se a página 5 está ativa e se as páginas 4, 5 e 6 estão visíveis
    await waitFor(() => {
      expect(screen.getByTestId('page-button-5')).toHaveClass(
        'bg-marvel text-white',
      )
      expect(screen.getByTestId('page-button-4')).toBeInTheDocument()
      expect(screen.getByTestId('page-button-6')).toBeInTheDocument()
      expect(screen.queryByTestId('page-button-1')).not.toBeInTheDocument()
    })
  })

  it('correctly handles previous and next button clicks', () => {
    render(
      <Pagination numberOfPages={10} limit={10} setOffset={mockSetOffset} />,
    )

    // Inicialmente na página 1, o botão "anterior" não deve estar presente
    expect(screen.queryByTestId('previous-button')).not.toBeInTheDocument()
    const nextButton = screen.getByTestId('next-button')

    // Clica em "próximo" para ir para a página 2
    fireEvent.click(nextButton)

    // Agora o botão "anterior" deve estar presente e habilitado
    const previousButton = screen.getByTestId('previous-button')
    expect(previousButton).toBeInTheDocument()
    expect(previousButton).not.toBeDisabled()

    // Clica em "anterior" para voltar para a página 1
    fireEvent.click(previousButton)

    // O botão "anterior" deve desaparecer novamente
    expect(screen.queryByTestId('previous-button')).not.toBeInTheDocument()
  })
})
