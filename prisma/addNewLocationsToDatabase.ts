import { Location } from '../types'

import prisma from './client'

const addNewLocationsToDatabase = async (
  renewalLocations: Location[]
): Promise<void> => {
  await renewalLocations.forEach(async (location: Location): Promise<void> => {
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
