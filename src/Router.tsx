import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Report } from './pages/Report'
import { DefaultLayout } from './layouts/DefaultLayout'
import { ChecklistFamilies } from './pages/ChecklistFamilies'
import { ChecklistItems } from './pages/ChecklistItems'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { Systems } from './pages/Systems'
import { Checklists } from './pages/Checklists'
import { useAuth } from './contexts/AuthContext'
import { PrincipleFamilies } from './pages/PrincipleFamilies'

export function Router() {
  const { isLogged } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />}>
          <Route path="/checklist/:id" element={<Home />} />
        </Route>
        <Route
          path="/login"
          element={!isLogged ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/register"
          element={!isLogged ? <Register /> : <Navigate replace to="/" />}
        />
        <Route path="/principles" element={<PrincipleFamilies />}>
          <Route path=":id" element={<PrincipleFamilies />} />
        </Route>
        <Route path="/checklist-families" element={<ChecklistFamilies />}>
          <Route path=":id" element={<ChecklistFamilies />} />
        </Route>
        <Route path="/checklist-items" element={<ChecklistItems />}>
          <Route path=":id" element={<ChecklistItems />} />
        </Route>
        <Route path="/report" element={<Report />}>
          <Route path=":id" element={<Report />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/checklists" element={<Checklists />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
