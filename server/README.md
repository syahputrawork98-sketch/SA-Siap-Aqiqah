# SA-Siap-Aqiqah Backend (Server)

Backend foundation built with Node.js and Express.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run the server:
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm run start
   ```

## API Endpoints

- **GET /**: Welcome message.
- **GET /api/health**: Health check status.

## Directory Structure

- `src/app.js`: Express application configuration.
- `src/server.js`: Server entry point.
- `src/routes/`: API route definitions.
- `src/controllers/`: Request handlers.
- `src/services/`: Business logic.
- `src/middlewares/`: Express middlewares (Auth, Error handling, etc.).
- `src/config/`: Configuration files (Env, Database, etc.).
