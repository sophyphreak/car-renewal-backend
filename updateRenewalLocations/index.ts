import { Location } from '../types'

import scrapeRenewalLocations from '../scraper'
import addNewLocationsToDatabase from '../prisma/addNewLocationsToDatabase'
import activateActiveLocations from '../prisma/activateActiveLocations'
import deactiveInactiveLocations from '../prisma/deactivateInactiveLocations'
import fetchLatLong from '../fetchLatLong'
import findLocationsWithoutLatLong from '../prisma/findLocationsWithoutLatLong'
import updateLocationsWithLatLong from '../prisma/updateLocationsWithLatLong'

const updateRenewalLocations = async () => {
  try {
    const renewalLocations: Location[] = await scrapeRenewalLocations()
    await addNewLocationsToDatabase(renewalLocations)
    await activateActiveLocations(renewalLocations)
    await deactiveInactiveLocations(renewalLocations)

    const locationsWithoutLatLong: Location[] =
      await findLocationsWithoutLatLong()
    const locationsWithLatLong: Location[] = await fetchLatLong(
      locationsWithoutLatLong
    )
    await updateLocationsWithLatLong(locationsWithLatLong)
  } catch (e) {
    console.error(e)
  }
}

export default updateRenewalLocations
