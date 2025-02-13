

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import Home from './Pages/HomePge'
import Welcome from './Pages/Welcome'
import Layout from './Layout'
import Users from './Pages/Users'
import Bookings from './Pages/Bookings'
import LogoutPage from './Pages/LogoutPage'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/' element={<Layout/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
        <Route path='logout' element={<LogoutPage/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
