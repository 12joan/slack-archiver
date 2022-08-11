import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ViewChannel from './pages/ViewChannel'

const App = () => {
  return (
    <main className="p-4">
      <Routes>
        <Route path="/app">
          <Route path="view" element={<ViewChannel />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  )
}

export default App
