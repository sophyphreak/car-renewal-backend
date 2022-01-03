import { CronJob as CronJob } from 'cron'
import updateRenewalLocations from '../updateRenewalLocations/index.js'

const startCron = () => {
  const job = new CronJob(
    '00 00 00 * * *',
    () => updateRenewalLocations(),
    null,
    true,
    'America/Los_Angeles'
  )
}

export default startCron
