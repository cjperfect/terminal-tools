import type { KeyboardEvent } from 'react'

export function enterKeyboardCallback<T>(callback?: (event: KeyboardEvent<T>) => any) {
  return function (e: KeyboardEvent<T>) {
    if (['Enter', 'NumberEnter'].includes(e.code)) {
      callback?.(e)
    }
  }
}
