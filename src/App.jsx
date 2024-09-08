import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Form from './Form'
import './App.css'
const App = () => {
  const location = useLocation()
  const [local, setLocal] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    setLocal(location)
  }),[location,local]

  return (
    <div className='container'>
      <Routes>
        <Route path='/form' element={<Form />} />
      </Routes>
      {local.pathname!=='/form'&&<button className='toform' onClick={() => navigate('/form')}>Добавить товар</button>}

    </div>
  )
}

export default App