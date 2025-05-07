### 1. Provision (or choose) a database : Decide whether you want to use PostgreSQL, MySQL, SQLite, etc. For local development, SQLite is easiest—no server required:

 - SQLite:point to a file, e.g.: DATABASE_URL="file:./dev.db"

### PostgreSQL : If Postgres installed (or a Docker container), create a database and note your connection URL: postgres://<user>:<password>@localhost:5432/<dbname>


# Here we are using Neon’s serverless client, so we need a real Postgres‐style URL in process.env.DATABASE_URL before ever reach to db/index.ts.
 - Grab your Neon connection string .Go to your Neon dashboard.Under your project, click Branch details → Connection strings.Copy the Native (Postgres-style) URL, e.g.:
        - postgres://<username>:<password>@<branch>.<your-org>.neon.tech/<dbname>

#  Create a .env file : In the root of your project (same folder as package.json):
    - DATABASE_URL="postgres://<username>:<password>@<branch>.<your-org>.neon.tech/<dbname>"
    - Security tip: Make sure you’ve added .env to your .gitignore.


# Best option which I used:
 ### Inline env-var in npm script.Use this command on Powershell to run the App:: $env:DATABASE_URL="postgres://..." ; npm run dev
 ### Inline env-var in npm script.Use this command on CMD prompt to run the App: set DATABASE_URL=postgres://...&& npm run dev
