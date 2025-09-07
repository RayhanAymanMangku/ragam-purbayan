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