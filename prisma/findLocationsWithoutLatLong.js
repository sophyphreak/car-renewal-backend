import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const findLocationsWithoutLatLong = async () => {
  const locationsWithoutLatLong = await prisma.location.findMany({
    where: { latitude: null, longitude: null },
  })
  return locationsWithoutLatLong
}

export default findLocationsWithoutLatLong
