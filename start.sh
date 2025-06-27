#!/bin/bash

# Exit immediately if a command fails
set -e

echo "📦 Starting Django server..."

# Go to backend and apply migrations
cd backend
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000 &

echo "⚛️ Starting React frontend..."

# Go to frontend
cd ../frontend

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
  npm install
fi

# Start React
npm run dev
