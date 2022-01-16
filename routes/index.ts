import express, { Request, Response } from 'express'
import { Location } from '../types/index'
const router = express.Router()
// @ts-ignore
import retrieveLocations from '../prisma/retrieveLocations'

router.get('/api/v1/renewal-locations', async (req, res, next) => {
  const locations: Location[] = await retrieveLocations()
  res.send(locations)
})

// for testing if two locations have the same latitude
router.get(
  '/api/v1/check-duplicate-locations',
  async (req: Request, res: Response) => {
    const locations: Array<Location> = await retrieveLocations()
    locations.sort((a: Location, b: Location): number => {
      if (b.latitude == null || a.latitude == null) return 0
      return b.latitude - a.latitude
    })
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
  }
)

export default router
