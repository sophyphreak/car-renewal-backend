import { CronJob as CronJob } from 'cron'
import updateRenewalLocations from '../updateRenewalLocations'

const startCron = (): void => {
  new CronJob(
    '00 00 00 * * *',
    (): Promise<void> => updateRenewalLocations(),
    null,
    true,
    'America/Los_Angeles'
  )
}

export default startCron
