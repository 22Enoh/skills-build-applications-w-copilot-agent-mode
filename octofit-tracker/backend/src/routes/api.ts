import { Router } from 'express'
import apiBaseUrl from '../config/apiUrl'
import db from '../config/database'
import Activity from '../models/Activity'
import LeaderboardEntry from '../models/LeaderboardEntry'
import Team from '../models/Team'
import User from '../models/User'
import Workout from '../models/Workout'

const router = Router()

router.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl,
    database: db.readyState === 1 ? 'connected' : 'disconnected',
  })
})

router.get('/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }))
  } catch (error) {
    next(error)
  }
})

router.get('/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().sort({ name: 1 }))
  } catch (error) {
    next(error)
  }
})

router.get('/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().sort({ completedAt: -1 }))
  } catch (error) {
    next(error)
  }
})

router.get('/leaderboard/', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().sort({ rank: 1 }))
  } catch (error) {
    next(error)
  }
})

router.get('/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ title: 1 }))
  } catch (error) {
    next(error)
  }
})

export default router