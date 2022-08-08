import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ViewChannel from './pages/ViewChannel'

const App = () => {
  return (
    <Routes>
      <Route path="/app">
        <Route path="view/:token" element={<ViewChannel />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
