import fetch from 'node-fetch'

const fetchLatLong = async locations => {
  const locationsWithLatLong = locations.map(async (location, index) => {
    await staggerRequests(index)
    const { address, city, zip } = location
    const queryString = encodeURIComponent(`${address}, ${city} ${zip}`)
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${process.env.GOOGLE_API_KEY}`
    let latitude, longitude
    let retryRequestCount = 0
    try {
      while (
        retryRequestCount < 5 &&
        (typeof latitude === 'undefined' || typeof longitude === 'undefined')
      ) {
        ;({ latitude, longitude } = await attemptFetch({
          uri,
          location,
          index,
        }))
        retryRequestCount++
      }
      location.latitude = latitude
      location.longitude = longitude
    } catch (error) {
      console.error(error)
    }
    printCoordinatesFoundMessage({ index, location })
    return location
  })
  return Promise.all(locationsWithLatLong)
}

// Google allows max 50 requests per second
const staggerRequests = async index => await timeout(100 * index)

const attemptFetch = async ({ uri, location, index }) => {
  const response = await fetch(uri)
  const data = await response.json()
  const { results } = data
  if (results.length === 0) {
    await printRequestFailedMessages({ location, index, data })
    return { undefined, undefined }
  }
  const { latitude, longitude } = await destructureLatLong(results)
  return { latitude, longitude }
}

const printRequestFailedMessages = async ({
  location: { store, address, city, zip },
  index,
  data,
}) => {
  console.log(
    `No lat long returned for index ${index}: ${store} ${address}, ${city} ${zip}`
  )
  console.log('data:', data)
  console.log('retrying...')
  await timeout(1000)
}

const destructureLatLong = async results => {
  const [
    {
      geometry: {
        location: { lat, lng },
      },
    },
  ] = results
  const latitude = lat
  const longitude = lng
  return { latitude, longitude }
}

const printCoordinatesFoundMessage = ({
  index,
  location: { store, address, city, zip, latitude, longitude },
}) =>
  console.log(
    `coordinates found for index ${index}: ${store} ${address}, ${city} ${zip} lat: ${latitude} lng: ${longitude}`
  )

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default fetchLatLong
