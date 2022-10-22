import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route  path='/game'/>
        </Routes>
    </BrowserRouter>
  )
}

export default App