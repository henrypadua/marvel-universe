import { useQuery } from '@tanstack/react-query'

import { api } from '@/libs/axios'

import { ComicResponse } from '@/interfaces/comics'

type useGetComicsProps = {
  characterId: string
}

export function useGetComics({ characterId }: useGetComicsProps) {
  return useQuery({
    queryKey: ['useGetComics', characterId],
    queryFn: () =>
      api
        .get<ComicResponse>(
          `/characters/${characterId}/comics?limit=10&orderBy=onsaleDate`,
        )
        .then((response) => response.data.data)
        .catch((error) => {
          throw new Error(error)
        }),
    retry: 1,
  })
}
