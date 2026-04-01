#!/bin/bash
# Start dev server and wait for it to be ready
npm run dev &
echo "Waiting for dev server..."
while ! curl -s http://localhost:3000 > /dev/null 2>&1; do
  sleep 1
done
echo "Dev server ready at http://localhost:3000/workspace"
