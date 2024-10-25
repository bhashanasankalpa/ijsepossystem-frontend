import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Itemcategory from './pages/Itemcategory'
import Item from './pages/Item'
import Stock from './pages/Stock'
import Sale from './pages/sales/Sale'
import CreateSales from './pages/sales/CreateSales'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Auth/Login'
import ProtectedRoute from './components/ProtectedRoute'




function App() {
 

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/itemcategories' element={<Itemcategory/>}/>
          <Route path='/items' element={<Item/>}/>
          <Route path='/stocks' element={<Stock/>}/>
          <Route path='/sales' element={<Sale/>}/>
          <Route path='/sales/createsales' element={<CreateSales/>}/>
        </Route>
        <Route path='/auth/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
