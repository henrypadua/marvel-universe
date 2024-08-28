import { render, screen } from '@testing-library/react'

import { HeaderHome } from '@/components/HeaderHome'

describe('HeaderHome component', () => {
  it('renders the Marvel logo', () => {
    render(<HeaderHome />)
    const logo = screen.getByAltText('Marvel Logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<HeaderHome />)
    const heading = screen.getByRole('heading', { name: 'listPage.title' })
    expect(heading).toBeInTheDocument()
  })

  it('renders the subheading', () => {
    render(<HeaderHome />)
    const subheading = screen.getByText(/listPage.subtitle/i)
    expect(subheading).toBeInTheDocument()
  })
})
