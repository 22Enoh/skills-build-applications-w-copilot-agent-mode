import { useEffect, useState } from 'react'
import { apiUrl, readCollection } from '../api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetch(apiUrl('/api/workouts/'))
      .then((response) => response.json())
      .then((payload) => setWorkouts(readCollection(payload)))
      .catch(() => setWorkouts([]))
  }, [])

  return (
    <section className="resource-panel">
      <h1>Workouts</h1>
      <div className="resource-grid">
        {workouts.map((workout) => (
          <article className="resource-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <p>{workout.focusArea}</p>
            <p>{workout.durationMinutes} minutes</p>
          </article>
        ))}
      </div>
    </section>
  )
}