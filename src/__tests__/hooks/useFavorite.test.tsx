import React from 'react'
import { act, render, renderHook } from '@testing-library/react'

import { FavoriteProvider, useFavorite } from '@/hooks/useFavorite'

import { Character } from '@/interfaces/characters'

const mockHero: Character = {
  id: 1,
  name: 'Spider-Man',
  description: '',
  modified: '2023-06-05T12:30:00Z',
  resourceURI: '',
  urls: [],
  thumbnail: {
    path: '',
    extension: '',
  },
  comics: {
    available: 0,
    collectionURI: '',
    items: [],
    returned: 0,
  },
  series: {
    available: 0,
    collectionURI: '',
    items: [],
    returned: 0,
  },
  stories: {
    available: 0,
    collectionURI: '',
    items: [],
    returned: 0,
  },
  events: {
    available: 0,
    collectionURI: '',
    items: [],
    returned: 0,
  },
}

describe('useFavorite hook', () => {
  // Simulação do localStorage
  let storageMock: { [key: string]: string }

  beforeEach(() => {
    storageMock = {}
    // Mock para localStorage.setItem
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn((key, value) => {
          storageMock[key] = value
        }),
        getItem: jest.fn((key) => storageMock[key] || null),
        removeItem: jest.fn((key) => {
          delete storageMock[key]
        }),
        clear: jest.fn(() => {
          storageMock = {}
        }),
      },
      writable: true,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should initialize favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([mockHero]))
    const { result } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    })

    expect(result.current.favorites).toEqual([mockHero])
  })

  it('should add a hero to favorites', () => {
    const { result } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    })

    act(() => result.current.handleSetFavorites(mockHero))
    expect(result.current.favorites).toEqual([mockHero])
    expect(localStorage.getItem('favorites')).toBe(JSON.stringify([mockHero]))
  })

  it('should remove a hero from favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mockHero]))
    const { result } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    })

    act(() => result.current.handleSetFavorites(mockHero))
    expect(result.current.favorites).toEqual([])
    expect(localStorage.getItem('favorites')).toBe(JSON.stringify([]))
  })

  it('should limit favorites to 5', () => {
    const heroes: Character[] = Array.from({ length: 6 }, (_, i) => ({
      ...mockHero,
      id: i + 1,
      name: `Hero ${i + 1}`,
    }))

    const { result } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    })
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    heroes.forEach((hero) => {
      act(() => result.current.handleSetFavorites(hero))
      // Verifica se o state esta com o valor esperado
      expect(result.current.favorites).toHaveLength(
        Math.min(heroes.indexOf(hero) + 1, 5),
      )
    })

    expect(alertMock).toHaveBeenCalledWith(
      'Você atingiu o limite de 5 favoritos',
    )
  })

  function TestComponent() {
    useFavorite()
    return null
  }
  it('should throw an error when used outside FavoriteProvider', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useFavorite must be used within an FavoriteProvider',
    )
  })
})
