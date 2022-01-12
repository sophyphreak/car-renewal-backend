import fetch from 'node-fetch'

const fetchLatLong = async locations => {
  const locationsWithLatLong = locations.map(async (location, index) => {
    await staggerRequest(index)
    const uri = generateUri(location)
    location = await fetchLoop({ location, index, uri })
    const { latitude, longitude } = location
    if (latitude != null && longitude != null) {
      printCoordinatesFoundMessage({ index, location })
    }
    return location
  })
  return Promise.all(locationsWithLatLong)
}

// Google allows max 50 requests per second
const staggerRequest = async index => await timeout(100 * index)

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

const generateUri = location => {
  const { address, city, zip } = location
  const queryString = encodeURIComponent(`${address}, ${city} ${zip}`)
  const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${process.env.GOOGLE_API_KEY}`
  return uri
}

const printCoordinatesFoundMessage = ({
  index,
  location: { store, address, city, zip, latitude, longitude },
}) =>
  console.log(
    `coordinates found for index ${index}: ${store} ${address}, ${city} ${zip} lat: ${latitude} lng: ${longitude}`
  )

const MAX_RETRYS = 5

// Loop repeats request if it fails, returns location with latitude and longitude
const fetchLoop = async ({ location, index, uri }) => {
  let data, ok, latitude, longitude
  try {
    for (let retryCount = 0; retryCount < MAX_RETRYS; retryCount++) {
      ;({ data, ok } = await attemptFetch(uri))
      if (ok) {
        break
      }
      printRequestFailedMessages({ location, index, data })
      await timeout(1000)
    }
    if (ok) {
      ;({ latitude, longitude } = destructureLatLong(data))
    }
    location.latitude = latitude
    location.longitude = longitude
  } catch (error) {
    console.error(error)
  }
  return location
}

const attemptFetch = async uri => {
  const response = await fetch(uri)
  const data = await response.json()
  const { status } = data
  if (status !== 'OK') {
    return { ok: false, data }
  }
  return { data, ok: true }
}

const printRequestFailedMessages = ({
  location: { store, address, city, zip },
  index,
  data,
}) => {
  console.log(
    `No lat long returned for index ${index}: ${store} ${address}, ${city} ${zip}`
  )
  console.log('data:', data)
  console.log('retrying...')
}

const destructureLatLong = data => {
  const {
    results: [
      {
        geometry: {
          location: { lat: latitude, lng: longitude },
        },
      },
    ],
  } = data
  return { latitude, longitude }
}

export default fetchLatLong
