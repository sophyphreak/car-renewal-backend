import checkIfPlacesExist from '../prisma/checkIfPlacesExist.js'
import updateRenewalLocations from '../updateRenewalLocations/index.js'

const startup = async () => {
  const placesExist = await checkIfPlacesExist()
  if (placesExist) {
    return
  }
  updateRenewalLocations()
  return
}

export default startup
