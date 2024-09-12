import { Args } from './args'

export class Command {
  _name?: string
  _description?: string
  _version?: string
  _subCommand: Command[] = []
  _registeredArguments: Args[] = []
  _parent?: Command

  constructor(name?: string) {
    this._name = name
  }

  name(val?: string) {
    if (!val) {
      return this._name
    }
    this._name = val
    return this
  }

  description(val: string) {
    this._description = val
  }

  version(val: string) {
    this._version = val
  }

  action(_input: string[]) {

  }

  /**
   * @example
   * .command('start <service>','start name service')
   * .command('stop [service]','stop name service')
   * @param nameAndArgs
   * @param description
   */
  subCommand(nameAndArgs: string, description?: string) {
    const [,name, args] = nameAndArgs.match(/([^ ]+) *(.*)/) || []

    const command = this.createCommand(name)

    if (description) {
      command.description(description)
    }

    if (args) {
      command.arguments(args)
    }

    this._registerComamnd(command)
    command._parent = this

    return command
  }

  arguments(name: string) {
    name.trim().split(/ +/).forEach((detail) => {
      this.argument(detail)
    })
    return this
  }

  argument(name: string, description?: string, defaultValue?: string) {
    const argument = this.createArgument(name, description)
    argument.default(defaultValue)
    this.addArgument(argument)
    return this
  }

  createCommand(name: string) {
    return new Command(name)
  }

  createArgument(name: string, description?: string) {
    return new Args(name, description)
  }

  addArgument(argument: Args) {
    const prevArgument = this._registeredArguments.slice(-1)[0]

    if (prevArgument && prevArgument.variadic) {
      throw new Error(`only the last argument can be variadic '${prevArgument.name}`)
    }

    if (argument.required && argument.defaultValue !== undefined) {
      throw new Error(`a default value for a required argument is never used: ${argument.name}`)
    }
    this._registeredArguments.push(argument)
    return this
  }

  private findSubComamnd(name?: string) {
    if (!name)
      return undefined
    return this._subCommand.find(cmd => cmd._name === name)
  }

  private _registerComamnd(command: Command) {
    const alreadyUsed = this.findSubComamnd(command._name)

    if (alreadyUsed) {
      throw new Error(`Cannot add command ${command._name} as already have command ${alreadyUsed._name}`)
    }

    this._subCommand.push(command)
  }
}
