import createError from 'http-errors'
import express, { Request, Response, Application } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import indexRouter from './routes/index'

import startCron from './cron/index'
startCron()

import startup from './startup/index'
startup()

const app: Application = express()

app.use(helmet())
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

interface Error {
  message: string
  status: number
}

// error handler
app.use(function (err: Error, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({ error: err.message })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
