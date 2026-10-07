import { useEffect, useState } from 'react'

function App() {
  const [services, setServices] = useState({ api: 'Checking', database: 'Checking' })

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('API health check failed')
        return response.json()
      })
      .then((health) => setServices({ api: 'Online', database: health.database }))
      .catch(() => setServices({ api: 'Unavailable', database: 'Unknown' }))
  }, [])

  return (
    <div className="container py-4">
      <header className="d-flex align-items-center gap-3 border-bottom pb-4">
        <img src="/octofitapp-small.png" alt="" width="48" height="48" />
        <div>
          <p className="small fw-semibold text-uppercase text-secondary mb-1">OctoFit Tracker</p>
          <p className="mb-0">Activity, teams, and progress.</p>
        </div>
      </header>

      <main className="py-5">
        <h1 className="h2 mb-2">Your fitness workspace</h1>
        <p className="text-secondary mb-4">Service status</p>

        <div className="row g-3">
          <div className="col-sm-6">
            <section className="border rounded p-3" aria-label="API service status">
              <h2 className="h6 text-secondary">API</h2>
              <p className="fs-5 mb-0">{services.api}</p>
            </section>
          </div>
          <div className="col-sm-6">
            <section className="border rounded p-3" aria-label="MongoDB service status">
              <h2 className="h6 text-secondary">MongoDB</h2>
              <p className="fs-5 mb-0">{services.database}</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
