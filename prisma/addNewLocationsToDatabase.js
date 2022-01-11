import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const addNewLocationsToDatabase = async renewalLocations => {
  await renewalLocations.forEach(async location => {
    const { store, address, city, zip, telephone } = location
    const locationExistsInDatabase = await prisma.location.findFirst({
      where: {
        store,
        address,
        city,
        zip,
        telephone,
      },
    })
    if (locationExistsInDatabase) {
      return
    }
    await prisma.location.create({
      data: location,
    })
  })
}

export default addNewLocationsToDatabase
