import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const getPlaces = async () => {
  const places = await prisma.place.findMany({})
  return places
}

export default getPlaces
