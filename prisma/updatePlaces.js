import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const updatePlaces = renewalLocations => {
  prisma.$executeRaw('DROP TABLE IF EXISTS Place')
  renewalLocations.forEach(async place => {
    await prisma.place.create({
      data: place,
    })
  })
}

export default updatePlaces
