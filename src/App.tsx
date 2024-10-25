import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Itemcategory from './pages/Itemcategory'
import Item from './pages/Item'
import Stock from './pages/Stock'




function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/itemcategories' element={<Itemcategory/>}/>
        <Route path='/items' element={<Item/>}/>
        <Route path='/stocks' element={<Stock/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
