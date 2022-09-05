import express from 'express'
import appRouter from './app/appRouter.js'
import apiRouter from './api/apiRouter.js'
import boltRouter from './slack/boltRouter.js'
import './s3.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/app/views')

app.use('/app', appRouter)
app.use('/api', apiRouter)
app.use('/slack', boltRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log('⚡️ Server is running!')
})
