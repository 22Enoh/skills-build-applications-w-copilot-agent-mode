import express from 'express'
import apiRoutes from './routes/api'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())
app.use(apiRoutes)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`)
  console.log(`OctoFit API base URL: ${apiBaseUrl}`)
})

export { apiBaseUrl }