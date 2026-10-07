import { useEffect, useState } from 'react'
import { apiUrl, readCollection } from '../api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    fetch(apiUrl('/api/leaderboard/'))
      .then((response) => response.json())
      .then((payload) => setLeaderboard(readCollection(payload)))
      .catch(() => setLeaderboard([]))
  }, [])

  return (
    <section className="resource-panel">
      <h1>Leaderboard</h1>
      <div className="resource-grid">
        {leaderboard.map((entry) => (
          <article className="resource-card" key={entry._id ?? entry.userEmail}>
            <h2>Rank {entry.rank}</h2>
            <p>{entry.userEmail}</p>
            <p>{entry.points} points</p>
          </article>
        ))}
      </div>
    </section>
  )
}