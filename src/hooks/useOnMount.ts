import { useEffect } from 'react'
import { useLatest } from './useLatest'

export function useOnMount<T extends Fn>(fn: T) {
  const latestFn = useLatest(fn)

  useEffect(() => {
    latestFn.current?.()
    return () => {}
  }, [])
}
