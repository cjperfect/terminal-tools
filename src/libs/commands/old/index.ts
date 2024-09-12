import { safeArray } from '../../utils/array'
import { History } from './history'
import type { Parsed } from './parse'
import { parse } from './parse'

export * from './parse'
export * from './command'
export * from './history'

export interface CommandResult extends Data {
  displayType: 'custom' | 'print'
}

export type CommandExecuteResult = CommandResult | undefined | void

export abstract class Command {
  public abstract execute(parsed: Parsed, commands: Commands): Promiseable<CommandExecuteResult>
  public abstract destory(): void
}

export interface CommandRegister {
  name: string
  instance: Command
}

export class Commands {
  private commands: Map<string, Command>
  private history: History
  static instance: null | Commands = null

  constructor(commands?: CommandRegister[]) {
    this.commands = new Map()
    this.history = new History()
    safeArray(commands).forEach((command) => {
      this.register(command)
    })
  }

  static createCommands(commands?: CommandRegister[]): Commands {
    if (!Commands.instance) {
      Commands.instance = new Commands(commands)
    }
    return Commands.instance
  }

  register(command: CommandRegister) {
    if (this.commands.has(command.name)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`The ${command.name} command has been registered`)
      }
      return
    }

    this.commands.set(command.name, command.instance)
  }

  unregister(name: string) {
    if (this.commands.has(name)) {
      this.commands.get(name)?.destory()
      this.commands.delete(name)
    }
  }

  matchHistory(input: string) {
    return this.history.matchHistory(input)
  }

  execute(input: string) {
    const parsed = parse(input)

    this.history.push({
      input,
      command: parsed.command,
    })

    const command = this.commands.get(parsed.command)

    if (command) {
      return command.execute(parsed, this)
    }
  }

  destroy() {
    this.commands.forEach((command) => {
      command.destory()
    })
    this.history.destory()
    this.commands.clear()
    Commands.instance = null
  }

  get historyList() {
    return this.history.historyList
  }
}
