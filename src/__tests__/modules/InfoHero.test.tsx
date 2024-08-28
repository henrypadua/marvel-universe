import { render, screen } from '@testing-library/react'

import { InfoHero } from '@/components/modules/InfoHero'

import { charactersMock } from '@/__mocks__/character'

describe('InfoHero component', () => {
  const mockHero = charactersMock.data.results[0]

  it('renders hero information correctly', () => {
    render(<InfoHero hero={mockHero} />)

    // Comics Information
    expect(screen.getByText('detailsPage.comics')).toBeInTheDocument()
    expect(screen.getByAltText('Quadrinhos')).toBeInTheDocument()
    expect(screen.getByText('1.671')).toBeInTheDocument()

    // Events Information (Filmes)
    expect(screen.getByText('detailsPage.movies')).toBeInTheDocument()
    expect(screen.getByAltText('Filmes')).toBeInTheDocument()
    expect(screen.getByText('26')).toBeInTheDocument()

    // Rating
    expect(screen.getByText('Rating:')).toBeInTheDocument()
    expect(screen.getByText('★★★★★')).toBeInTheDocument()

    expect(screen.getByText('detailsPage.latestComics:')).toBeInTheDocument()
  })
})
