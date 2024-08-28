import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useGetCharacters } from '@/services/useGetCharacters'

import { api } from '@/libs/axios'

import { charactersMock } from '@/__mocks__/character'

jest.mock('@/libs/axios')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
describe('useGetCharacters service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches characters data with default parameters', async () => {
    ;(api.get as jest.Mock).mockResolvedValue({ data: charactersMock })
    const { result } = renderHook(
      () =>
        useGetCharacters({
          nameStartsWith: '',
          orderBy: 'name',
          limit: 20,
          offset: 1,
        }),

      { wrapper },
    )
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBe(charactersMock.data)
    expect(api.get).toHaveBeenCalledWith(
      '/characters?offset=1&orderBy=name&limit=20',
    )
  })

  it('fetches characters data with custom parameters', async () => {
    ;(api.get as jest.Mock).mockResolvedValue({ data: charactersMock })
    const { result } = renderHook(
      () =>
        useGetCharacters({
          limit: 10,
          offset: 50,
          nameStartsWith: 'Spid',
          orderBy: '-name',
        }),
      { wrapper },
    )

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBe(charactersMock.data)
    expect(api.get).toHaveBeenCalledWith(
      '/characters?offset=50&orderBy=-name&nameStartsWith=Spid&limit=10',
    )
  })

  it('fetches characters data with error', async () => {
    const errorMessage = 'Error fetching data'
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))
    const { result } = renderHook(
      () =>
        useGetCharacters({
          nameStartsWith: '',
          orderBy: 'name',
          limit: 0,
          offset: 1,
        }),
      { wrapper },
    )

    expect(result.current.isLoading).toBe(true)
  })
})
