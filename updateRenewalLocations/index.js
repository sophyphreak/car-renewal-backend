import scrapeRenewalLocations from '../scraper/index.js'
import addNewLocationsToDatabase from '../prisma/addNewLocationsToDatabase.js'
import activateActiveLocations from '../prisma/activateActiveLocations.js'
import deactiveInactiveLocations from '../prisma/deactivateInactiveLocations.js'
import fetchLatLong from '../fetchLatLong/index.js'
import findLocationsWithoutLatLong from '../prisma/findLocationsWithoutLatLong.js'
import updateLocationsWithLatLong from '../prisma/updateLocationsWithLatLong.js'

const updateRenewalLocations = async () => {
  try {
    const renewalLocations = await scrapeRenewalLocations()
    await addNewLocationsToDatabase(renewalLocations)
    await activateActiveLocations(renewalLocations)
    await deactiveInactiveLocations(renewalLocations)

    const locationsWithoutLatLong = await findLocationsWithoutLatLong()
    const locationsWithLatLong = await fetchLatLong(locationsWithoutLatLong)
    await updateLocationsWithLatLong(locationsWithLatLong)
  } catch (e) {
    console.error(e)
  }
}

export default updateRenewalLocations
