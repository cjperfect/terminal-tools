import { useEffect } from 'react'
import type { BasicTarget } from '../utils/dom'
import { getTargetElement } from '../utils/dom'
import { useLatest } from './useLatest'

export function useMutationObserver(callback: MutationCallback, target: BasicTarget, options: MutationObserverInit = {}) {
  const callbackRef = useLatest(callback)

  useEffect(() => {
    const el = getTargetElement(target)
    if (!('MutationObserver' in window) || typeof window === 'undefined' || !el) {
      return
    }

    const observer = new MutationObserver(callbackRef.current)
    observer.observe(el, options)

    return () => {
      observer.disconnect()
    }
  }, [])
}
