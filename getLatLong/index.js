import fetch from 'node-fetch'

const getLatLong = async renewalLocations => {
  renewalLocations = renewalLocations.slice(0, 1)
  const locationsWithLatLong = renewalLocations.map(async location => {
    const { address, city, zip } = location
    const queryString = `${address}, ${city} ${zip}`
    try {
      const data = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_API_KEY}&query=${queryString}`
      )
      const {
        data: [{ latitude, longitude }],
      } = await data.json()
      location.latitude = latitude
      location.longitude = longitude
      return location
    } catch (error) {
      console.error(error)
    }
  })
  return Promise.all(locationsWithLatLong)
}

export default getLatLong
