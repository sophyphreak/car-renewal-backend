import prisma from './client.js'

const findLocationsWithoutLatLong = async () => {
  const locationsWithoutLatLong = await prisma.location.findMany({
    where: { latitude: null, longitude: null },
  })
  return locationsWithoutLatLong
}

export default findLocationsWithoutLatLong
