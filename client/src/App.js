import logo from './logo.svg';
import './App.css';
import 'materialize-css'
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { Router } from 'react-router';
import { Navbar } from './components/Navbar';

function App() {
  const {token, login, logout, userId}= useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated

    }}>
{/*<Router> */}
{isAuthenticated && <Navbar />}
    <div className="container">
    {routes} 
    </div>
{/*</Router> */}
    </AuthContext.Provider>
  );
}

export default App;
// "dev": "concurrently \"npm run server\" \"npm run client\""
