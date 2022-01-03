import express from 'express'
const router = express.Router()
import getPlaces from '../prisma/getPlaces.js'

router.get('/api/v1/renewal-locations', async (req, res, next) => {
  const places = await getPlaces()
  res.send(places)
})

export default router
