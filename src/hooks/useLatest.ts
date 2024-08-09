import { useRef } from 'react'

export function useLatest<T>(val: T) {
  const latest = useRef<T>(val)

  latest.current = val

  return latest
}
