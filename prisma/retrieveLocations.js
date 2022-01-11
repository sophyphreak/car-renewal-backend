import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const retrieveLocations = async () => {
  const locations = await prisma.location.findMany({
    where: {
      active: true,
    },
  })
  return locations
}

export default retrieveLocations
