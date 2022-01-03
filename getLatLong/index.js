import fetch from 'node-fetch'

const getLatLong = async renewalLocations => {
  // renewalLocations = renewalLocations.slice(124, 126)
  const locationsWithLatLong = renewalLocations.map(async (location, index) => {
    const { store, address, city, zip } = location
    const queryString = encodeURIComponent(`${address}, ${city} ${zip}`)
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${process.env.GOOGLE_API_KEY}`
    let latitude, longitude
    try {
      await timeout(100 * index)
      while (
        typeof latitude === 'undefined' ||
        typeof longitude === 'undefined'
      ) {
        console.log(
          `start fetch for index ${index}: ${store} ${address}, ${city} ${zip}`
        )
        const response = await fetch(uri)
        const data = await response.json()
        const { results } = data
        if (results.length === 0) {
          console.log(
            `No lat long returned for index ${index}: ${store} ${address}, ${city} ${zip}`
          )
          console.log('data:', data)
          console.log('retrying...')
          await timeout(1000)
          continue
        }
        const [
          {
            geometry: {
              location: { lat, lng },
            },
          },
        ] = results
        latitude = lat
        longitude = lng
      }
      console.log(
        `coordinates found for index ${index}: ${store} ${address}, ${city} ${zip} lat: ${latitude} lng: ${longitude}`
      )
      location.latitude = latitude
      location.longitude = longitude
      return location
    } catch (error) {
      console.error(error)
    }
  })
  return Promise.all(locationsWithLatLong)
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default getLatLong
