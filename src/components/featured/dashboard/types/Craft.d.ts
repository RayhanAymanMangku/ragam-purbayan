export type Craft = {
    name: string
    type: string[]
    owner: string
    email: string
    phone: string
    maps: string
    images: string[]
    description: string
    slug: string
}

export type CraftWithoutSlug = {
    id: string
    name: string
    type: string[]
    owner: string
    email: string
    phone: string
    maps: string
    images: string[]
    description: string
}

export type CraftDisplay = {
        id: string,
        name: string,
        type: string,
        owner: string,
        email: string,
        phone: string,
        maps: string,
        images: string[]
}

export type CardType = {
  id: string
  owner: string
  className: string
  thumbnail: string
  email: string
  phone: string
  maps: string
  name: string
  description: string
}

export interface CraftData {
    id: string,
    name: string,
    type: string,
    owner: string,
    email: string,
    phone: string,
    maps: string,
    images: string[]
}