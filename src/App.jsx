import { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import LinkPage from './components/LinkPage'
import Unauthorized from './components/Unauthorized'
import Home from './components/Home'
import Editor from './components/Editor'
import Admin from './components/Admin'
import Lounge from './components/Lounge'
import Missing from './components/Missing'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'

const ROLES = {
  user: "ROLE_USER",
  editor: "ROLE_EDITOR",
  admin: "ROLE_ADMIN"
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin, ROLES.editor]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.editor, ROLES.admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
