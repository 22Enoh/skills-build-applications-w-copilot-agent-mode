import { useEffect, useState } from 'react'
import { apiUrl, readCollection } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetch(apiUrl('/api/activities/'))
      .then((response) => response.json())
      .then((payload) => setActivities(readCollection(payload)))
      .catch(() => setActivities([]))
  }, [])

  return (
    <section className="resource-panel">
      <h1>Activities</h1>
      <div className="resource-grid">
        {activities.map((activity) => (
          <article className="resource-card" key={activity._id ?? `${activity.userEmail}-${activity.completedAt}`}>
            <h2>{activity.activityType}</h2>
            <p>{activity.userEmail}</p>
            <p>{activity.durationMinutes} minutes</p>
          </article>
        ))}
      </div>
    </section>
  )
}