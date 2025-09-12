import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Wardrobe from './wardrobe'
import Create  from './create'
import Forum from './forum'
import Account from './account'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/create" element={<Create />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
