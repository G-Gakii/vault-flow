#!/bin/bash

# Go to backend and run Django server
cd backend
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000 &

# Go to frontend and start React app
cd ../frontend
npm install
npm start
