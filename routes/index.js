const express = require('express')
const router = express.Router()
const scraper = require('../scraper')

router.get('/', async (req, res, next) => {
  const renewalLocations = await scraper()
  res.send(renewalLocations)
})

module.exports = router
