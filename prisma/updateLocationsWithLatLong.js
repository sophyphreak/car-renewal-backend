import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const updateLocationsWithLatLong = async locations => {
  for (let location of locations) {
    const { store, address, city, zip, telephone, latitude, longitude } =
      location
    try {
      const { id } = await prisma.location.findFirst({
        where: {
          store,
          address,
          city,
          zip,
          telephone,
        },
      })
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
