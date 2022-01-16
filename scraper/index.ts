import puppeteer from 'puppeteer'
import _ from 'lodash'
import { Location } from '../types'

const scrapeRenewalLocations = async (): Promise<Location[]> => {
  try {
    const renewalLocations = await executeScrape()
    renewalLocations.forEach(({ store, address, city, zip, telephone }) =>
      validateLocation({ store, address, city, zip, telephone })
    )
    return renewalLocations
  } catch (error) {
    console.error(error)
    return []
  }
}

const executeScrape = async (): Promise<Location[]> => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto('https://www.hctax.net/Auto/RenewalLocations')
  const renewalLocations = await page.$$eval('tr', (rows) => {
    rows.shift() // remove header row
    return rows.map((row) => {
      const columns = [...row.querySelectorAll('td')]
      const [store, address, city, zip, telephone] = columns.map(
        (cell) => cell?.textContent?.trim() ?? ''
      )
      return {
        store,
        address,
        city,
        zip,
        telephone,
        latitude: null,
        longitude: null,
      }
    })
  })
  await browser.close()
  return renewalLocations
}

interface PartialLocation {
  store: string
  address: string
  city: string
  zip: string
  telephone: string

  [key: string]: string
}

const validateLocation = (partialLocation: PartialLocation): void => {
  let errorString = ''
  const keyValuePairs = _.toPairs(partialLocation)
  for (const [key, value] of keyValuePairs) {
    if (value === '') {
      errorString += `\`${key}\` `
    }
  }
  if (errorString.length) {
    throw new Error(`${errorString}were returned as \`undefined\``)
  }
}

export default scrapeRenewalLocations
