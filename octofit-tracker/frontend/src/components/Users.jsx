import { useEffect, useState } from 'react'
import { apiUrl, readCollection } from '../api'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(apiUrl('/api/users/'))
      .then((response) => response.json())
      .then((payload) => setUsers(readCollection(payload)))
      .catch(() => setUsers([]))
  }, [])

  return (
    <section className="resource-panel">
      <h1>Users</h1>
      <div className="resource-grid">
        {users.map((user) => (
          <article className="resource-card" key={user._id ?? user.email}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.fitnessGoal}</p>
          </article>
        ))}
      </div>
    </section>
  )
}