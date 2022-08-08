import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const resolve = p => path.resolve(path.dirname(fileURLToPath(import.meta.url)), p)
const isProduction = process.env.NODE_ENV === 'production'

const readTemplate = () => fs.readFileSync(resolve(isProduction ? './dist/client/index.html' : './index.html'), 'utf8')

const app = express.Router()

let viteServer, staticIndex

if (isProduction) {
  const { default: compression } = await import('compression')
  const { default: serveStatic } = await import('serve-static')

  app.use(compression())
  app.use(serveStatic(resolve('./dist/client'), { index: false }))

  staticIndex = readTemplate()
} else {
  const vite = await import('vite')

  viteServer = await vite.createServer({
    server: {
      middlewareMode: true,
      watch: { usePolling: true, interval: 100 },
      hmr: { port: process.env.VITE_HMR_PORT || 3001 },
    },
    appType: 'custom',
  })

  app.use(viteServer.middlewares)
}

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl

    const template = isProduction
      ? staticIndex
      : await viteServer.transformIndexHtml(url, readTemplate())

    const { render } = isProduction
      ? await import('./dist/server/entry-server.js')
      : await viteServer.ssrLoadModule(resolve('./entry-server.jsx'))

    const context = {}
    const appHtml = render({ url, context })

    if (context.url)
      return res.redirect(301, context.url)

    const html = template.replace(`<!--app-html-->`, appHtml)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    viteServer?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

export default app
