import express from 'express'
const router = express.Router()
import getPlaces from '../prisma/getPlaces.js'

router.get('/api/v1/renewal-locations', async (req, res, next) => {
  const places = await getPlaces()
  res.send(places)
})

// for testing if two locations have the same latitude
router.get('/api/v1/check-duplicate-locations', async (req, res, next) => {
  const places = await getPlaces()
  places.sort((a, b) => b.latitude - a.latitude)
  let hasDouble = false
  for (let i = 0; i < places.length - 1; i++) {
    if (places[i] === places[i + 1]) {
      hasDouble = true
      console.log('double found:')
      console.log(places[i])
      console.log(places[i + 1])
    }
  }
  res.send(hasDouble)
})

export default router
