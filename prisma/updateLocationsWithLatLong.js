import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

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
