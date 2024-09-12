'use client'
import { useEffect, useState } from 'react'
import type { ResultProps } from './types'
import OutputResult from './components/OutputResult'
import { TerminalInput } from './components/TerminalInput'
import { Command } from '@/libs/commands/command'

export default function BaseTerminal() {
  // const { history, execute } = useCommands()

  const [resultList, _setResultList] = useState<ResultProps[]>([])

  const handleEnter = async (_input: string = '') => {
    // const _res = await execute(input)
  }

  useEffect(() => {
    const command = new Command('git')

    command.description('code manage tool').version('0.0.1')

    command
      .option('-v,--version', 'Display command version')
      .action(() => {
        return {
          type: 'custom',
          struct: {

          },
        }
      })

    command
      .subComamnd('status <file>', 'show file status')
      .option('-p,--path', 'file path')
      .action(() => {
        return {
          type: 'custom',
          struct: {

          },
        }
      })

    // command.parse(['status', '--path=/usr/local', 'command.ts'])
    command.parse(['--version', '--path=/usr/local', 'command.ts'])

    return () => {

    }
  }, [])

  return (
    <div className="container flex justify-center items-center py-24">
      <section className="size-full flex flex-col rounded-xl border-2 border-stone-100">
        <header className="p-3 border-b-2 border-b-zinc-50">
          header
        </header>
        <div className="size-full flex gap-x-3">
          <main className="size-full overflow-y-auto p-3 flex flex-col gap-y-1 flex-[4]">
            {resultList.map(({ key, content }) => {
              return <OutputResult key={key} content={content} />
            })}

            <TerminalInput onEnter={handleEnter} />
          </main>
        </div>
      </section>
    </div>
  )
}
