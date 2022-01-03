import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const checkIfPlacesExist = async () => {
  const placeCount = await prisma.place.count({})
  console.log(placeCount)
  if (placeCount === 0) {
    return false
  }
  return true
}

export default checkIfPlacesExist
