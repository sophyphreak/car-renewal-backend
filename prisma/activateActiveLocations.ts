import { Location } from '../types'

import prisma from './client'

const activateActiveLocations = async (
  renewalLocations: Location[]
): Promise<void> => {
  renewalLocations.forEach(async (location) => {
    const { store, address, city, zip, telephone } = location
    const locationRecord = await prisma.location.findFirst({
      where: {
        store,
        address,
        city,
        zip,
        telephone,
      },
    })
    if (locationRecord == null) {
      return
    }
    const { id } = locationRecord
    await prisma.location.update({
      where: { id },
      data: {
        active: true,
      },
    })
  })
}

export default activateActiveLocations
