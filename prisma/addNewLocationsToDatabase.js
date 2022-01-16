import prisma from './client.js'

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
