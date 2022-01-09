import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const updatePlaces = async renewalLocations => {
  try {
    // TODO:
    // make it so this only deletes missing entries and adds new entries
    // -> will require changing other files as well
    await prisma.place.deleteMany({})
    renewalLocations.forEach(async place => {
      await prisma.place.create({
        data: place,
      })
    })
  } catch (e) {
    console.error(e)
  }
}

export default updatePlaces
