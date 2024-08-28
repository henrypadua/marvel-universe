import { render, screen } from '@testing-library/react'

import { Container } from '@/components/Container'

describe('Container component', () => {
  it('renders children correctly', () => {
    const childrenText = 'This is the container content'
    render(<Container>{childrenText}</Container>)

    const contentElement = screen.getByText(childrenText)
    expect(contentElement).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<Container>Container Content</Container>)
    const containerElement = screen.getByText('Container Content').parentElement

    const actualContainer = containerElement?.firstChild as HTMLElement

    expect(actualContainer).toHaveClass('container m-auto max-w-[1110px] px-5')
  })

  it('merges additional classNames', () => {
    const additionalClassName = 'bg-gray-200 rounded-md'
    render(<Container className={additionalClassName}>Content</Container>)

    const containerElement = screen.getByText('Content').parentElement
    const actualContainer = containerElement?.firstChild as HTMLElement

    expect(actualContainer).toHaveClass(
      'container m-auto max-w-[1110px] px-5 bg-gray-200 rounded-md',
    )
  })
})
