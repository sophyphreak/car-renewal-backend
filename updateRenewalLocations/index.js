import scrapeRenewalLocations from '../scraper/index.js'
import getLatLong from '../getLatLong/index.js'
import updatePlaces from '../prisma/updatePlaces.js'

const updateRenewalLocations = async () => {
  let renewalLocations = await scrapeRenewalLocations()
  renewalLocations = await getLatLong(renewalLocations)
  updatePlaces(renewalLocations)
}

export default updateRenewalLocations
