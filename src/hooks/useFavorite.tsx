import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Character } from '@/interfaces/characters'

type FavoriteProviderProps = {
  children: React.ReactNode
}

type FavoriteContextType = {
  favorites: Character[]
  setFavorites: Dispatch<SetStateAction<Character[]>>
  handleSetFavorites: (hero: Character) => void
}

const FavoriteContext = createContext({} as FavoriteContextType)

function FavoriteProvider({ children }: Readonly<FavoriteProviderProps>) {
  const [favorites, setFavorites] = useState<Character[]>([])

  const handleSetFavorites = (hero: Character) => {
    const index = favorites.findIndex((fav) => fav.id === hero.id)

    if (favorites.length >= 5 && index === -1) {
      alert('Você atingiu o limite de 5 favoritos')
      return
    }

    if (index === -1) {
      setFavorites([...favorites, hero])
      localStorage.setItem('favorites', JSON.stringify([...favorites, hero]))
    } else {
      const newFavorites = favorites.filter((fav) => fav.id !== hero.id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    }
  }

  useEffect(() => {
    const favorites = localStorage.getItem('favorites')
    if (favorites) {
      setFavorites(JSON.parse(favorites))
    }
  }, [])

  const values = useMemo(
    () => ({ favorites, setFavorites, handleSetFavorites }),
    [favorites, setFavorites],
  )

  return (
    <FavoriteContext.Provider value={values}>
      {children}
    </FavoriteContext.Provider>
  )
}
function useFavorite() {
  const favoriteContext = useContext(FavoriteContext)

  if (
    !favoriteContext.favorites ||
    !favoriteContext.setFavorites ||
    !favoriteContext.handleSetFavorites
  ) {
    throw new Error('useFavorite must be used within an FavoriteProvider')
  }

  return favoriteContext
}

export { FavoriteProvider, useFavorite }
