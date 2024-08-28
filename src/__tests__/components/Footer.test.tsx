import { render, screen } from '@testing-library/react'

import { Footer } from '@/components/Footer'
describe('Footer component', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    const copyrightText = screen.getByText('© 2024 Marvel Search Heroes')
    expect(copyrightText).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    render(<Footer />)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toHaveClass(
      'absolute bottom-0 mt-20 flex h-16 w-full items-center justify-center bg-marvel',
    )
  })
})
