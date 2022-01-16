interface Location {
  id?: number
  store: string
  address: string
  city: string
  zip: string
  telephone: string
  latitude: number | null
  longitude: number | null
  active?: boolean
}

export { Location }
