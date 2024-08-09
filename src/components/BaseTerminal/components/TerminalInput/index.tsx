'use client'
import { useRef, useState } from 'react'
import { useInputCaret } from '@/hooks/useInputCaret'
import { enterKeyboardCallback } from '@/utils/eventHelper'

export interface TerminalInputProps {
  onEnter?: (value?: string) => void
}

export function TerminalInput(props: TerminalInputProps) {
  const { onEnter } = props

  const terminalInputRef = useRef<HTMLDivElement | null>(null)
  const caretStyle = useInputCaret(terminalInputRef)
  const [isEmpty, setIsEmpty] = useState(true)

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
      <span className="terminal-input-caret" style={caretStyle} />
    </section>
  )
}
