import { Location } from '../types'

import prisma from './client'

const updateLocationsWithLatLong = async (
  locations: Location[]
): Promise<void> => {
  for (let location of locations) {
    const { id, latitude, longitude } = location
    try {
      await prisma.location.update({
        where: { id },
        data: {
          latitude,
          longitude,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export default updateLocationsWithLatLong
