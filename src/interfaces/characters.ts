interface Url {
  type: string
  url: string
}

interface Thumbnail {
  path: string
  extension: string
}

interface Item {
  resourceURI: string
  name: string
}

interface Comics {
  available: number
  returned: number
  collectionURI: string
  items: Item[]
}

interface Events {
  available: number
  returned: number
  collectionURI: string
  items: Item[]
}

interface Series {
  available: number
  returned: number
  collectionURI: string
  items: Item[]
}

interface StoryItem extends Item {
  type: string
}

interface Stories {
  available: number
  returned: number
  collectionURI: string
  items: StoryItem[]
}

export interface Character {
  id: number
  name: string
  description: string
  modified: string
  resourceURI: string
  urls: Url[]
  thumbnail: Thumbnail
  comics: Comics
  stories: Stories
  events: Events
  series: Series
}

interface Data {
  offset: number
  limit: number
  total: number
  count: number
  results: Character[]
}

export interface CharacterResponse {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  data: Data
  etag: string
}
