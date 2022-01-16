import prisma from './client.js'

const updateLocationsWithLatLong = async locations => {
  for (let location of locations) {
    const { id, latitude, longitude } = location
    try {
      await prisma.location.update({
        where: { id },
        data: {
          latitude,
          longitude,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export default updateLocationsWithLatLong
