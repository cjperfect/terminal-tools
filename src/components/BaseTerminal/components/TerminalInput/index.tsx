'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { enterKeyboardCallback } from '@/utils/eventHelper'

export interface TerminalInputProps {
  onEnter?: (value?: string) => void
}

export function TerminalInput(props: TerminalInputProps) {
  const { onEnter } = props

  const terminalInputRef = useRef<HTMLDivElement | null>(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const [caretStyle, setCaretStyle] = useState([0, 0, false])

  const caretStyleMemo = useMemo(() => {
    return {
      top: `${caretStyle[0]}px`,
      left: `${caretStyle[1]}px`,
      opacity: caretStyle[2] ? '1' : '0',
    }
  }, [caretStyle])

  const terminalInputFocus = () => {
    terminalInputRef.current?.focus()
  }

  const initCaretPosition = () => {
    const terminalInputEl = terminalInputRef.current
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

  const enterCallback = enterKeyboardCallback<HTMLDivElement>((e) => {
    if (e.shiftKey) {
      return
    }
    e.stopPropagation()
    e.preventDefault()
    const value = e.currentTarget.textContent || ''
    onEnter?.(value)
    e.currentTarget.textContent = ''
  })

  useEffect(() => {
    const terminalInputEl = terminalInputRef.current
    if (!terminalInputEl) {
      return
    }
    terminalInputFocus()
    updateCaretPosition()
    window.document.addEventListener('click', terminalInputFocus)
    window.document.addEventListener('keydown', terminalInputFocus)

    terminalInputEl?.addEventListener('input', updateCaretPosition)
    terminalInputEl?.addEventListener('keydown', updateCaretPosition)
    terminalInputEl?.addEventListener('click', updateCaretPosition)
    window.document.addEventListener('resize', updateCaretPosition)
    const observer = new MutationObserver(updateCaretPosition)
    observer.observe(terminalInputEl?.parentNode || terminalInputEl, {
      childList: true,
      subtree: true,
    })

    return () => {
      window.document.removeEventListener('click', terminalInputFocus)
      window.document.removeEventListener('keydown', terminalInputFocus)
      terminalInputEl?.removeEventListener('input', updateCaretPosition)
      terminalInputEl?.removeEventListener('keydown', updateCaretPosition)
      terminalInputEl?.removeEventListener('click', updateCaretPosition)
      window.document.removeEventListener('resize', updateCaretPosition)
      observer.disconnect()
    }
  }, [])

  return (
    <section className="w-full flex flex-col">
      <label htmlFor="terminal-input" className="text-indigo-800">&gt; /</label>
      <div
        ref={terminalInputRef}
        id="terminal-input"
        className="terminal-input"
        contentEditable="true"
        data-empty={isEmpty}
        onKeyDown={enterCallback}
        onInput={(e) => {
          if (!e.currentTarget.textContent && !isEmpty) {
            setIsEmpty(true)
          } else {
            setIsEmpty(false)
          }
        }}
      >
      </div>
      <span className="terminal-input-caret" style={caretStyleMemo} />
    </section>
  )
}
