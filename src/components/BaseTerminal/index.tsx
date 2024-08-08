'use client'
import { useState } from 'react'
import type { ResultProps } from './types'
import OutputResult from './components/OutputResult'
import { TerminalInput } from './components/TerminalInput'

export default function BaseTerminal() {
  const [resultList, setResultList] = useState<ResultProps[]>([])

  const handleEnter = (content: string = '') => {
    if (content.toLocaleLowerCase() === 'clear') {
      setResultList([])
    } else {
      setResultList((pre) => {
        return [
          ...pre,
          {
            key: Math.random().toString(36).slice(2, 10),
            cmd: content,
            content: {
              demo: 'null',
            },
          },
        ]
      })
    }
  }

  return (
    <div className="container flex justify-center items-center py-24">
      <section className="size-full flex flex-col rounded-xl border-2 border-stone-100">
        <header className="p-3 border-b-2 border-b-zinc-50">
          header
        </header>
        <main className="size-full overflow-y-auto p-3 flex flex-col gap-y-1">
          {resultList.map(({ key, content }) => {
            return <OutputResult key={key} content={content} />
          })}

          <TerminalInput onEnter={handleEnter} />
        </main>
      </section>
    </div>
  )
}
