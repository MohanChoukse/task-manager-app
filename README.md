# 🚀 Task Manager Web Application

A full-stack task management application built with React, Node.js, Express, and Sequelize. Users can sign up, log in, and manage their tasks with a beautiful Kanban-style interface.

## ✨ Features

- **🔐 User Authentication**: JWT-based authentication with bcrypt password hashing
- **📋 Task Management**: Create, update, and delete tasks
- **🎯 Status Tracking**: Tasks progress through "To Do" → "In Progress" → "Done"
- **🎨 Modern UI**: Responsive design with TailwindCSS
- **🔒 Secure APIs**: Protected routes with middleware
- **📱 Responsive**: Works on desktop and mobile devices
- **⚡ Real-time Updates**: Instant UI updates with toast notifications

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **Sequelize ORM** - Database management
- **SQLite** - Database (can be easily switched to PostgreSQL/MySQL)
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **Vite** - Build tool

## 📁 Project Structure

```
task-manager-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── index.js
│   │   ├── user.js
│   │   └── task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TaskCard.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   cp env.example .env
   ```
   
   Edit the `.env` file:
   ```env
   PORT=5000
   DATABASE_URL=sqlite:./db/database.sqlite
   JWT_SECRET=your_super_secure_jwt_secret_here
   NODE_ENV=development
   ```

4. **Start the application**
   
   **Option 1: Run both together (recommended)**
   ```bash
   # From root directory
   npm run dev
   ```
   
   **Option 2: Run separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 📚 API Endpoints

### Authentication
- `POST /api/signup` - Create new user account
- `POST /api/login` - User login

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task status
- `DELETE /api/tasks/:id` - Delete task

## 🎯 Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Add new tasks using the input field at the top
4. **Manage Tasks**: 
   - Click "Next" to move tasks through statuses
   - Click "×" to delete tasks
   - Tasks are automatically grouped by status

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server
```

### Database
The application uses SQLite by default. To switch to PostgreSQL or MySQL:

1. Update `DATABASE_URL` in `.env`
2. Install the appropriate database driver
3. Update `config/database.js` dialect

## 🚀 Deployment

### Backend (Render/Heroku)
1. Set environment variables
2. Update CORS origins
3. Deploy with `npm start`

### Frontend (Vercel/Netlify)
1. Set `VITE_API_URL` environment variable
2. Deploy with `npm run build`

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- CORS configuration
- Rate limiting
- Helmet security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Task Managing! 🎉** 