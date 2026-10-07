# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## API URL Configuration

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` so the frontend can call the backend through the forwarded public URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

You can place this value in `octofit-tracker/frontend/.env.local`. If `VITE_CODESPACE_NAME` is unset, the app tries to infer the backend URL from the current Codespaces frontend URL and safely falls back to `http://localhost:8000` for local development.

You can also override the backend URL directly:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

The frontend calls these API routes:

- `/api/activities/`
- `/api/leaderboard/`
- `/api/teams/`
- `/api/users/`
- `/api/workouts/`
