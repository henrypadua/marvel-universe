import { Character } from './characters'

interface Data {
  offset: number
  limit: number
  total: number
  count: number
  results: Character[]
}

export interface CharacterDetailResponse {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  data: Data
  etag: string
}
