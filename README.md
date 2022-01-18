# ServiceNow PDI Refresher

> This refresher will periodically login ServiceNow Personal Developer Instance (PDI) to ensure that your don't lose your work in your instance.

## What this does

1. Creates a cron job on your machine to run periodically.
2. Uses Puppeteer to launch your PDI in a headless browser and logs in.

## Getting Started
1. Fill out the environment variables with your
   1. Instance Name
   2. Username
   3. Password
2. Setup a cron job that will run node index.js in this directory.
