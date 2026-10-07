import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { apiUrl } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navigation = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const [services, setServices] = useState({ api: 'Checking', database: 'Checking' })

  useEffect(() => {
    fetch(apiUrl('/api/health'))
      .then((response) => {
        if (!response.ok) throw new Error('API health check failed')
        return response.json()
      })
      .then((health) => setServices({ api: 'Online', database: health.database }))
      .catch(() => setServices({ api: 'Unavailable', database: 'Unknown' }))
  }, [])

  return (
    <div className="container py-4 app-shell">
      <header className="d-flex align-items-center gap-3 border-bottom pb-4">
        <img src="/octofitapp-small.png" alt="" width="48" height="48" />
        <div className="flex-grow-1">
          <p className="small fw-semibold text-uppercase text-secondary mb-1">OctoFit Tracker</p>
          <p className="mb-0">Activity, teams, and progress.</p>
        </div>
        <div className="text-end">
          <span className="badge text-bg-light">API {services.api}</span>
          <span className="badge text-bg-light ms-2">MongoDB {services.database}</span>
        </div>
      </header>

      <nav className="nav nav-pills gap-2 py-3" aria-label="OctoFit sections">
        {navigation.map((item) => (
          <NavLink className="nav-link" key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="py-5">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
