import express from 'express'
import webRouter from './web/webRouter.js'
import boltRouter from './slack/boltRouter.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/web/views')

app.use('/web', webRouter)
app.use('/slack', boltRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log('⚡️ Server is running!')
})
