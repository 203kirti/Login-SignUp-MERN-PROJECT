import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { Route, Routes ,Navigate } from 'react-router-dom'
import RefreshHandler from './RefreshHandler';
import { useState } from 'react'


function App() {

  const [isAuthenticated , setIsAuthenticated ] = useState(false);

  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
      <div className='App'>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<PrivateRoute element={< Home />} />} />
        </Routes>
      </div>
  )
}

export default App
