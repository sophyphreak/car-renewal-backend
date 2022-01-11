import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const deactiveInactiveLocations = async renewalLocations => {
  const activeLocationsInDatabase = await prisma.location.findMany({
    where: { active: true },
  })
  for (let databaseLocation of activeLocationsInDatabase) {
    const { id, store, address, city, zip, telephone } = databaseLocation
    const isRenewalLocation = !!renewalLocations.find(location => {
      if (
        location.store === store &&
        location.address === address &&
        location.city === city &&
        location.zip === zip &&
        location.telephone === telephone
      ) {
        return true
      }
      return false
    })
    if (isRenewalLocation) {
      continue
    }
    await prisma.location.update({
      where: { id },
      data: { active: false },
    })
  }
}

export default deactiveInactiveLocations
