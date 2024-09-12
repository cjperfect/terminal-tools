import { useEffect, useRef, useState } from 'react'
import type { CommandRegister, HistoryItem } from '@/libs/commands'
import { Commands } from '@/libs/commands'

const commandsRegister: CommandRegister[] = []

export function useCommands() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const commandsRef = useRef<Commands>()

  const execute: Commands['execute'] = async (input: string) => {
    const commandResult = await commandsRef.current?.execute(input)
    setHistory(() => [
      ...commandsRef.current?.historyList || [],
    ])
    return commandResult
  }

  const historyMatch = (input: string = '') => {
    return commandsRef.current?.matchHistory(input)
  }

  useEffect(() => {
    commandsRef.current = new Commands(commandsRegister)

    return () => {
      commandsRef.current?.destroy()
      commandsRef.current = undefined
    }
  }, [])

  return {
    history,
    execute,
    historyMatch,
  }
}
