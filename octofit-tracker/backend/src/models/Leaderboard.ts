import { Schema, model } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    weeklyStreak: { type: Number, required: true },
  },
  { timestamps: true },
)

export default model('Leaderboard', leaderboardSchema, 'leaderboard')