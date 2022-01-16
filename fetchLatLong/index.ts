import { Location } from '../types'

import fetch from './fetch'

const fetchLatLong = async (locations: Location[]): Promise<Location[]> => {
  const locationsWithLatLong = locations.map(async (location, index) => {
    await staggerRequest(index)
    const uri = generateUri(location)
    location = await attemptFetchAndLoopIfFails({ location, index, uri })
    const { latitude, longitude } = location
    if (latitude != null && longitude != null) {
      printCoordinatesFoundMessage({ index, location })
    }
    return location
  })
  return Promise.all(locationsWithLatLong)
}

// Google allows max 50 requests per second
const staggerRequest = async (index: number): Promise<void> => {
  await timeout(100 * index)
}

const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const generateUri = (location: Location): string => {
  const { address, city, zip } = location
  const queryString = encodeURIComponent(`${address}, ${city} ${zip}`)
  const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${process.env.GOOGLE_API_KEY}`
  return uri
}

const printCoordinatesFoundMessage = ({
  index,
  location: { store, address, city, zip, latitude, longitude },
}: {
  index: number
  location: Location
}): void =>
  console.log(
    `coordinates found for index ${index}: ${store} ${address}, ${city} ${zip} lat: ${latitude} lng: ${longitude}`
  )

const MAX_RETRYS = 5

const attemptFetchAndLoopIfFails = async ({
  location,
  index,
  uri,
}: {
  location: Location
  index: number
  uri: string
}): Promise<Location> => {
  let geoCodeData, ok, latitude, longitude
  try {
    for (let retryCount = 0; retryCount < MAX_RETRYS; retryCount++) {
      ;({ geoCodeData, ok } = await attemptFetch(uri))
      if (ok) {
        break
      }
      printRequestFailedMessages({ location, index, geoCodeData })
      await timeout(1000)
    }
    if (ok && geoCodeData) {
      ;({ latitude, longitude } = destructureLatLong(geoCodeData))
    }
    location.latitude = latitude ?? null
    location.longitude = longitude ?? null
  } catch (error) {
    console.error(error)
  }
  return location
}

interface GeoCodeData {
  results: [{ geometry: { location: { lat: number; lng: number } } }]
  status: string
}

const attemptFetch = async (
  uri: string
): Promise<{ geoCodeData: GeoCodeData; ok: boolean }> => {
  const response = await fetch(uri)
  const geoCodeData = await response.json()
  const { status } = geoCodeData
  if (status !== 'OK') {
    return { ok: false, geoCodeData }
  }
  return { geoCodeData, ok: true }
}

const printRequestFailedMessages = ({
  location: { store, address, city, zip },
  index,
  geoCodeData,
}: {
  location: Location
  index: number
  geoCodeData: GeoCodeData
}): void => {
  console.log(
    `No lat long returned for index ${index}: ${store} ${address}, ${city} ${zip}`
  )
  console.log('geoCodeData:', geoCodeData)
  console.log('retrying...')
}

interface Coordinates {
  latitude: number
  longitude: number
}

const destructureLatLong = (geoCodeData: GeoCodeData): Coordinates => {
  const {
    results: [
      {
        geometry: {
          location: { lat: latitude, lng: longitude },
        },
      },
    ],
  } = geoCodeData
  return { latitude, longitude }
}

export default fetchLatLong
