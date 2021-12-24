const express = require('express')
const router = express.Router()
const scraper = require('../scraper')

router.get('/api/v1/renewal-locations', async (req, res, next) => {
  const renewalLocations = await scraper()
  res.send(renewalLocations)
})

module.exports = router
