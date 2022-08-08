import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

const render = ({ url, context }) => ReactDOMServer.renderToString(
  <StaticRouter location={url} context={context}>
    <App />
  </StaticRouter>
)

export {
  render,
}
