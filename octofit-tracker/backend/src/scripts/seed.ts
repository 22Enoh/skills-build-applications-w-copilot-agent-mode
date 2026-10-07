import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    name: 'Maya Chen',
    email: 'maya.chen@octofit.test',
    role: 'athlete',
    fitnessGoal: 'Build endurance',
  },
  {
    name: 'Jordan Smith',
    email: 'jordan.smith@octofit.test',
    role: 'athlete',
    fitnessGoal: 'Increase strength',
  },
  {
    name: 'Avery Patel',
    email: 'avery.patel@octofit.test',
    role: 'coach',
    fitnessGoal: 'Coach team performance',
  },
];

const teams = [
  { name: 'Velocity Crew', city: 'Seattle', coach: 'Avery Patel', memberCount: 12 },
  { name: 'Summit Striders', city: 'Denver', coach: 'Riley Gomez', memberCount: 9 },
  { name: 'Circuit Squad', city: 'Austin', coach: 'Morgan Lee', memberCount: 15 },
];

const activities = [
  {
    userEmail: 'maya.chen@octofit.test',
    activityType: 'Run',
    durationMinutes: 42,
    caloriesBurned: 410,
    completedAt: new Date('2026-10-05T14:30:00.000Z'),
  },
  {
    userEmail: 'jordan.smith@octofit.test',
    activityType: 'Strength training',
    durationMinutes: 55,
    caloriesBurned: 520,
    completedAt: new Date('2026-10-06T21:00:00.000Z'),
  },
  {
    userEmail: 'avery.patel@octofit.test',
    activityType: 'Cycling',
    durationMinutes: 60,
    caloriesBurned: 640,
    completedAt: new Date('2026-10-07T12:15:00.000Z'),
  },
];

const leaderboard = [
  { userEmail: 'avery.patel@octofit.test', points: 1280, rank: 1, weeklyStreak: 8 },
  { userEmail: 'jordan.smith@octofit.test', points: 1135, rank: 2, weeklyStreak: 6 },
  { userEmail: 'maya.chen@octofit.test', points: 1090, rank: 3, weeklyStreak: 5 },
];

const workouts = [
  {
    title: 'Endurance Builder 45',
    focusArea: 'Cardio',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    recommendedForGoal: 'Build endurance',
  },
  {
    title: 'Foundation Strength Circuit',
    focusArea: 'Full body strength',
    difficulty: 'Beginner',
    durationMinutes: 35,
    recommendedForGoal: 'Increase strength',
  },
  {
    title: 'Mobility Reset',
    focusArea: 'Recovery',
    difficulty: 'All levels',
    durationMinutes: 25,
    recommendedForGoal: 'Improve mobility',
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      Leaderboard.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
