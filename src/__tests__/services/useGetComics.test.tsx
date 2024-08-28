import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useGetComics } from '@/services/useGetComics'

import { api } from '@/libs/axios'

import { comicsMock } from '@/__mocks__/comics'

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
const characterId = '12345'

describe('useGetComics service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches comics data successfully', async () => {
    ;(api.get as jest.Mock).mockResolvedValue({ data: comicsMock })

    const { result } = renderHook(() => useGetComics({ characterId }), {
      wrapper,
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBe(comicsMock.data)
    expect(api.get).toHaveBeenCalledWith(
      `/characters/${characterId}/comics?limit=10&orderBy=onsaleDate`,
    )
  })

  it('handles errors correctly', async () => {
    const errorMessage = 'Error fetching data'
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useGetComics({ characterId }), {
      wrapper,
    })

    expect(result.current.isLoading).toBe(false)
  })
})
