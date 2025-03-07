//ไฟล App.jsx เราจะใช้จัดการเส้นทางของเว็บ
//rfce หรือ rfc

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginRunner from './views/LoginRunner.jsx'
import RegisterRunner from './views/RegisterRunner.jsx'
import EditRunner from './views/EditRunner.jsx'
import AddRunOfRunner from './views/AddRunOfRunner.jsx'
import DelRunOfRunner from './views/DelRunOfRunner.jsx'
import RunOfRunner from './views/RunOfRunner.jsx'
import EditRunOfRunner from './views/EditRunOfRunner.jsx'
// import { CssBaseline } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRunner />} />
          <Route path="/runner/registerrunner" element={<RegisterRunner />} />
          <Route path="/runner/editrunner" element={<EditRunner />} />
          <Route path="/run/addrunofrunner" element={<AddRunOfRunner />} />
          <Route path="/run/delrunofrunner" element={<DelRunOfRunner />} />
          <Route path="/run/runofrunner" element={<RunOfRunner />} />
          <Route path="/run/editrunofrunner/:runId" element={<EditRunOfRunner />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
