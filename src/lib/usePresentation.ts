import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PresentationMode } from '../presentation/navigation'
import { rememberReturnPoint } from './scrollMemory'

/** Abre o Modo Apresentação (opcionalmente em uma cena/modo) lembrando o ponto de retorno. */
export function useOpenPresentation() {
  const navigate = useNavigate()
  return useCallback(
    (options: { scene?: string; mode?: PresentationMode } = {}) => {
      rememberReturnPoint()
      const params = new URLSearchParams()
      if (options.scene) params.set('cena', options.scene)
      if (options.mode) params.set('modo', options.mode)
      const query = params.toString()
      navigate(`/apresentacao${query ? `?${query}` : ''}`)
    },
    [navigate],
  )
}
