# Todo List App

A full-stack todo list app with a React frontend and an Express/MongoDB backend.

## Project Structure

- `backend/` - Express API, MongoDB models, auth middleware
- `frontend/` - React app for login, signup, and todo management

## Clone the Project

```bash
git clone <your-repo-url>
cd todo-list
```

## Local Setup

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Start the backend:

```bash
npm start
```

### 2. Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/` for local or deployed API access:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

## Deploying to Render and Vercel

### Backend on Render

1. Create a new Render Web Service from the `backend/` folder.
2. Use the start command:

```bash
npm start
```

3. Add these environment variables in Render:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000
FRONTEND_URL=https://todos-list-omega-pied.vercel.app/
```

4. Make sure your MongoDB Atlas cluster allows connections from Render.

### Frontend on Vercel

1. Create a new Vercel project from the `frontend/` folder.
2. Add this environment variable in Vercel:

```env
REACT_APP_API_URL=https://todos-list-uu2k.onrender.com
```

3. Use the default React build settings. Vercel will run:

```bash
npm run build
```

## Notes

- The frontend API base URL is configurable through `REACT_APP_API_URL`.
- The backend uses `MONGO_URI` for MongoDB and `JWT_SECRET` for auth tokens.
- The backend CORS origin is controlled by `FRONTEND_URL`.
- If you change the backend URL later, update `REACT_APP_API_URL` in Vercel.

## Scripts

### Backend

- `npm start` - start the API server
- `npm run dev` - start the API server

### Frontend

- `npm start` - start the React dev server
- `npm run build` - build the app for production
- `npm test` - run tests
