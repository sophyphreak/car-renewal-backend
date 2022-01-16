import prisma from './client'

const findLocationsWithoutLatLong = async () => {
  const locationsWithoutLatLong = await prisma.location.findMany({
    where: { latitude: null, longitude: null },
  })
  return locationsWithoutLatLong
}

export default findLocationsWithoutLatLong
