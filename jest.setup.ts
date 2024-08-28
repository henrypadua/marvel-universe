import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@uidotdev/usehooks', () => ({
  useDebounce: jest.fn((value) => value),
}))

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  jest.restoreAllMocks()
})
