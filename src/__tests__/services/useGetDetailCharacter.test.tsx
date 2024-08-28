import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useGetDetailCharacter } from '@/services/useGetDetailCharacter'

import { api } from '@/libs/axios'

import { heroDetail } from '@/__mocks__/characterDetail'

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

describe('useGetDetailCharacter service', () => {
  const characterId = '12345'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches character detail data successfully', async () => {
    ;(api.get as jest.Mock).mockResolvedValue({
      data: heroDetail,
    })

    const { result } = renderHook(
      () => useGetDetailCharacter({ characterId }),
      { wrapper },
    )

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBe(heroDetail.data)
    expect(api.get).toHaveBeenCalledWith(`/characters/${characterId}`)
  })

  it('handles errors correctly', async () => {
    const errorMessage = 'Error fetching character detail'
    ;(api.get as jest.Mock).mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(
      () => useGetDetailCharacter({ characterId }),
      { wrapper },
    )

    expect(result.current.isLoading).toBe(false)
  })
})
