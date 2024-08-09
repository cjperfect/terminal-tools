import { isFunction } from 'lodash-es'
import { useMemo, useState } from 'react'
import type { BasicTarget } from '../utils/dom'
import { getTargetElement } from '../utils/dom'
import { useEventListener } from './useEventListener'
import { useMutationObserver } from './useMutationObserver'
import { useOnMount } from './useOnMount'

export function useInputCaret(target: BasicTarget) {
  const [caretStyle, setCaretStyle] = useState([0, 0, false])

  const caretStyleMemo = useMemo(() => {
    return {
      top: `${caretStyle[0]}px`,
      left: `${caretStyle[1]}px`,
      opacity: caretStyle[2] ? '1' : '0',
    }
  }, [caretStyle])

  const terminalInputFocus = () => {
    const el = getTargetElement(target)
    if (el && 'focus' in el && isFunction(el.focus)) {
      el.focus()
    }
  }

  const initCaretPosition = () => {
    const terminalInputEl = getTargetElement(target)
    if (terminalInputEl) {
      const { top, left } = terminalInputEl.getBoundingClientRect()
      setCaretStyle(() => [top, left, true])
    }
  }

  const updateCaretPosition = () => {
    const range = window.getSelection?.()?.getRangeAt(0)
    if (!range) {
      return
    }
    const rect = range.getBoundingClientRect()
    if (rect.top === 0) {
      initCaretPosition()
      return
    }
    setCaretStyle(() => [rect.top + window.screenY - 24, rect.left + window.scrollX, true])
  }

  useOnMount(() => {
    terminalInputFocus()
    updateCaretPosition()
  })

  useEventListener('click', terminalInputFocus, {
    target: document,
  })
  useEventListener('keydown', terminalInputFocus, {
    target: document,
  })

  useEventListener('input', updateCaretPosition, {
    target,
  })
  useEventListener('keydown', updateCaretPosition, {
    target,
  })
  useEventListener('click', updateCaretPosition, {
    target,
  })
  useEventListener('resize', updateCaretPosition)
  useMutationObserver(updateCaretPosition, target, {
    childList: true,
    subtree: true,
  })

  return caretStyleMemo
}
