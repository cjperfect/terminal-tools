import { useEffect } from 'react'
import { useLatest } from './useLatest'

export function useUnMount<T extends Fn>(fn: T) {
  const latestFn = useLatest(fn)

  useEffect(() => {
    return () => {
      latestFn.current?.()
    }
  }, [])
}
