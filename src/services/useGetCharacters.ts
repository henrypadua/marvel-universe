import { useQuery } from '@tanstack/react-query'

import { api } from '@/libs/axios'

import { CharacterResponse } from '@/interfaces/characters'

type useGetCharactersProps = {
  limit: number
  offset: number
  nameStartsWith: string
  orderBy: string
}

export function useGetCharacters({
  limit = 20,
  offset = 1,
  nameStartsWith,
  orderBy = 'name',
}: useGetCharactersProps) {
  return useQuery({
    queryKey: ['useGetCharacters', limit, offset, nameStartsWith, orderBy],
    queryFn: async () => {
      const baseQuery = `/characters?offset=${offset}&orderBy=${orderBy}`
      const limitQuery = limit > 0 ? `&limit=${limit}` : ''
      const nameQuery =
        nameStartsWith.length > 0 ? `&nameStartsWith=${nameStartsWith}` : ''
      const fullQuery = baseQuery + nameQuery + limitQuery

      return api
        .get<CharacterResponse>(fullQuery)
        .then((response) => response.data.data)
        .catch((error) => {
          throw new Error(error)
        })
    },
    retry: 1,
  })
}
