import { useEffect, useState } from 'react'
import { apiUrl, readCollection } from '../api'

export default function Teams() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetch(apiUrl('/api/teams/'))
      .then((response) => response.json())
      .then((payload) => setTeams(readCollection(payload)))
      .catch(() => setTeams([]))
  }, [])

  return (
    <section className="resource-panel">
      <h1>Teams</h1>
      <div className="resource-grid">
        {teams.map((team) => (
          <article className="resource-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p>{team.city}</p>
            <p>{team.memberCount} members</p>
          </article>
        ))}
      </div>
    </section>
  )
}