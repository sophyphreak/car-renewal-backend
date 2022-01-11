import express from 'express'
const router = express.Router()
import retrieveLocations from '../prisma/retrieveLocations.js'

router.get('/api/v1/renewal-locations', async (req, res, next) => {
  const locations = await retrieveLocations()
  res.send(locations)
})

// for testing if two locations have the same latitude
router.get('/api/v1/check-duplicate-locations', async (req, res, next) => {
  const locations = await retrieveLocations()
  locations.sort((a, b) => b.latitude - a.latitude)
  let hasDouble = false
  for (let i = 0; i < locations.length - 1; i++) {
    if (locations[i] === locations[i + 1]) {
      hasDouble = true
      console.log('double found:')
      console.log(locations[i])
      console.log(locations[i + 1])
    }
  }
  res.send(hasDouble ? 'Double found!' : 'No double found')
})

export default router
