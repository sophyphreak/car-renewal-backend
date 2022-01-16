import prisma from './client.js'

const activateActiveLocations = async renewalLocations => {
  renewalLocations.forEach(async location => {
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
