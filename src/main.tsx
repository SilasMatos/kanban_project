import ReactDOM from 'react-dom/client'
import Rotas from './routes/router'
import { AuthProvider } from './contexts/AuthContext'

import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Rotas />
  </AuthProvider>
)
