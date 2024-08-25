import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { useAuth } from '../contexts/AuthContext'

const Rotas: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </Router>
  )
}

export default Rotas
