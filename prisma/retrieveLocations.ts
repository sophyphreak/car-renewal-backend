import prisma from './client'
import { Location } from '../types/index'

const retrieveLocations = async () => {
  const locations: Location[] = await prisma.location.findMany({
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
