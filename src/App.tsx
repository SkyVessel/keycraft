import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TitleBar     from './components/layout/TitleBar'
import StatusBar    from './components/layout/StatusBar'
import Studio       from './pages/Studio'
import Kits         from './pages/Kits'
import Box          from './pages/Box'
import Manufacturers from './pages/Manufacturers'
import AuthGuard    from './components/AuthGuard'
import { useDesign } from './hooks/useDesign'

export default function App() {
  const { design } = useDesign()
  return (
    <BrowserRouter>
      <AuthGuard>
        <div className="flex flex-col h-screen bg-kc-bg overflow-hidden">
          <TitleBar />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Navigate to="/studio" replace />} />
              <Route path="/studio"        element={<Studio />} />
              <Route path="/kits"          element={<Kits />} />
              <Route path="/box"           element={<Box />} />
              <Route path="/manufacturers" element={<Manufacturers />} />
            </Routes>
          </main>
          <StatusBar design={design} connected={true} saved={false} />
        </div>
      </AuthGuard>
    </BrowserRouter>
  )
}
