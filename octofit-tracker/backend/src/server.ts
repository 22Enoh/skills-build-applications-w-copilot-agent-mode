import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/api'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      callback(null, true)
      return
    }

    if (
      origin === 'http://localhost:5173'
      || origin === 'http://127.0.0.1:5173'
      || /^https:\/\/[a-zA-Z0-9-]+-5173\.app\.github\.dev$/.test(origin)
    ) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked origin: ${origin}`))
  },
}))

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