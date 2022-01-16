import prisma from './client.js'

const retrieveLocations = async () => {
  const locations = await prisma.location.findMany({
    where: {
      active: true,
    },
  })
  for (let location of locations) {
    delete location.active
  }
  return locations
}

export default retrieveLocations
