import puppeteer from 'puppeteer'

const scrapeRenewalLocations = async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto('https://www.hctax.net/Auto/RenewalLocations')
    const renewalLocations = await page.$$eval('tr', rows => {
      rows.shift() // remove header row
      return rows.map(row => {
        const columns = [...row.querySelectorAll('td')]
        const [store, address, city, zip, telephone] = columns.map(cell =>
          cell.textContent.trim()
        )
        return {
          store,
          address,
          city,
          zip,
          telephone,
        }
      })
    })
    await browser.close()
    return renewalLocations
  } catch (error) {
    console.error(error)
  }
}

export default scrapeRenewalLocations
