import { AnimatePresence, MotionConfig } from 'motion/react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/ProjectPage'
import { PresentationLayout } from './presentation/components/PresentationLayout'

export default function App() {
  const location = useLocation()

  return (
    // reducedMotion="user": com prefers-reduced-motion, movimentos viram transições de opacidade.
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projetos/:slug" element={<ProjectPage />} />
          <Route path="/apresentacao" element={<PresentationLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  )
}
