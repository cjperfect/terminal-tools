import { Option } from './option'
import { Argument } from './argument'
import { humanReadableArgName } from './util'
import { EventEmitter } from './eventEmitter'
import type { ActionHandler, CommandResultType } from './interface'

export class Command extends EventEmitter {
  _name: string
  _description: string
  _version: string
  _subCommand: Command[]
  _options: Option[]
  _arguments: Argument[]
  parent?: Command
  _optionValues: Data<unknown> = {}
  _optionValueSources: Data<unknown> = {}
  _actionHandler?: ActionHandler
  args: string[] = []

  constructor(name: string) {
    super()
    this._name = name
    this._description = ''
    this._version = '0.0.1'
    this._subCommand = []
    this._options = []
    this._arguments = []
  }

  name(): string
  name(val: string): Command
  name(val?: string): string | Command {
    if (val === undefined) {
      return this._name
    }
    this._name = val
    return this
  }

  description(): string
  description(val: string): Command
  description(val?: string): string | Command {
    if (!val) {
      return this._description || ''
    }
    this._description = val
    return this
  }

  version(): string
  version(val: string): Command
  version(val?: string): string | Command {
    if (!val) {
      return this
    }
    this._version = val
    return this
  }

  action<P, R extends CommandResultType = 'custom'>(fn: ActionHandler<P, R>) {
    this._actionHandler = fn as unknown as ActionHandler
    return this
  }

  parse(argv: string[]) {
    this._parseCommand([], argv)
  }

  _parseCommand(operands: string[], unkown: string[]) {
    const parsed = this.parseOptions(unkown)
    operands = operands.concat(parsed.operands)
    unkown = parsed.unknown
    this.args = operands.concat(unkown)

    if (operands && this.findSubCommand(operands[0])) {
      // TODO: dispatch sub command
      return this.dispatchSubCommand(operands[0], operands.slice(1), unkown)
    }

    // TODO: Dispatch help command

    // TODO: Dispatch default help command

    if (this._subCommand.length && this.args.length === 0) {
      // TODO: Provider help
    }
  }

  parseOptions(argv: string[]) {
    const operands: string[] = []
    const unknown: string[] = []
    let dest: string[] = operands
    const args = argv.slice()

    function maybeOption(arg: string) {
      return arg.length > 1 && arg[0] === '-'
    }

    let activeVariadicOption = null

    while (args.length) {
      const arg = args.shift()!

      if (arg === '--') {
        if (dest === unknown)
          dest.push(arg)

        dest.push(...args)

        break
      }

      if (activeVariadicOption && !maybeOption(arg)) {
        this.emit(`option:${activeVariadicOption.name()}`, arg)
        continue
      }

      activeVariadicOption = null

      if (maybeOption(arg)) {
        const option = this.findOption(arg)

        if (option) {
          const eventKey = `option:${option?.name()}`
          if (option.required) {
            const value = args.shift()
            if (value === undefined) {
              throw new Error(`error: option '${option.flags}' argument missing`)
            }
            this.emit(eventKey, value)
          } else if (option.optional) {
            let value = null
            if (args.length > 0 && !maybeOption(args[0])) {
              value = args.shift()
            }
            this.emit(eventKey, value)
          } else {
            this.emit(eventKey)
          }

          activeVariadicOption = option.variadic ? option : null
          continue
        }
      }

      if (arg.length > 2 && arg[0] === '-' && arg[1] !== '-') {
        const option = this.findOption(`-${arg[1]}`)
        const eventKey = `option:${option?.name()}`
        if (option) {
          if (option.required || option.optional) {
            this.emit(eventKey, arg.slice(2))
          } else {
            this.emit(eventKey)
            args.unshift(`-${arg.slice(2)}`)
          }
          continue
        }
      }

      if (/^--[^=]+=/.test(arg)) {
        const index = arg.indexOf('=')
        const option = this.findOption(arg.slice(0, index))
        if (option && (option.required || option.optional)) {
          this.emit(`option:${option.name()}`, arg.slice(index + 1))
          continue
        }
      }

      if (maybeOption(arg)) {
        dest = unknown
      }

      if (
        operands.length === 0 && unknown.length === 0
      ) {
        if (this.findSubCommand(arg)) {
          operands.push(arg)
          if (args.length > 0)
            unknown.push(...args)
          break
        } else if (arg === 'help') {
          // TODO: Help command print or output help data struct
          break
        }
      }

      dest.push(arg)
    }

    return { operands, unknown }
  }

  dispatchSubCommand(_name: string, _operands: string[], _unknown: string[]) {

  }

  /**
   * @example
   * subCommand('status <path> <type>','show file status')
   */
  subComamnd(nameAndArgs: string, description?: string) {
    const [,name, args] = nameAndArgs.match(/([^ ]+) *(.*)/) || []

    const command = this.createComamnd(name)

    if (description) {
      command.description(description)
    }

    if (args) {
      command.arguments(args)
    }

    this.registerCommand(command)
    command.parent = this

    return command
  }

  registerCommand(command: Command) {
    const alreadyUserd = this.findSubCommand(command.name())

    if (alreadyUserd) {
      throw new Error(`already exist sub command ${alreadyUserd.name()}.`)
    }

    this._subCommand.push(command)
  }

  createComamnd(name: string) {
    return new Command(name)
  }

  /**
   * @example
   * argumnets("<path> <type>")
   */
  arguments(names: string) {
    names
      .trim()
      .split(/\s+/)
      .forEach((arg) => {
        this.argument(arg)
      })
    return this
  }

  argument(name: string, description?: string, defaultValue?: unknown) {
    const arg = this.createArgument(name, description)

    if (defaultValue) {
      arg.default(defaultValue)
    }

    this.addArgument(arg)

    return this
  }

  addArgument(arg: Argument) {
    const prevArgs = this._arguments.slice(-1)[0]
    if (prevArgs && prevArgs.variadic) {
      throw new Error(
            `only the last argument can be variadic '${prevArgs.name()}'`,
      )
    }

    if (arg.required && arg.defaultvalue !== undefined) {
      throw new Error(`a default value for a required argument is never used: '${arg.name()}`)
    }

    this._arguments.push(arg)
    return this
  }

  createArgument(name: string, description?: string) {
    return new Argument(name, description)
  }

  /**
   * @example
   */
  option(flags: string, description?: string, defaultValue?: string) {
    const option = this.createOption(flags, description)

    if (defaultValue) {
      option.default(defaultValue)
    }

    return this.addOption(option)
  }

  addOption(option: Option) {
    this.registerOption(option)

    const name = option.name()

    if (option.defaultValue) {
      this.setOptionValueWithSource(name || '', option.defaultValue, 'default')
    }

    const handleOptionValue = (val: string | boolean | null = null, valueSource: string) => {
      if (val === null) {
        if (option.isBoolean() || option.optional) {
          val = true
        } else {
          val = ''
        }
      }

      this.setOptionValueWithSource(name!, val, valueSource)
    }

    this.on(`option:${name}`, (val: string | boolean) => {
      handleOptionValue(val, 'action')
    })

    return this
  }

  registerOption(option: Option) {
    const matchingOption = (option.short && this.findOption(option.short)) || (option.long && this.findOption(option.long))

    if (matchingOption) {
      const matchingFlag = option.long && this.findOption(option.long) ? option.long : option.short

      throw new Error(
      `Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`}
      due to conflicting flag '${matchingFlag}' -  already used by option '${matchingOption.flags}'`,
      )
    }

    this._options.push(option)
  }

  createOption(flags: string, description?: string) {
    return new Option(flags, description)
  }

  setOptionValueWithSource(key: string, value: unknown, source: string) {
    this._optionValues[key] = value

    this._optionValueSources[key] = source
    return this
  }

  getOptionValueSource(key: string) {
    return this._optionValueSources[key]
  }

  private findSubCommand(name: string) {
    return this._subCommand.find(command => command.name() === name)
  }

  private findOption(arg: string) {
    return this._options.find(option => option.is(arg))
  }

  private findArgument(name: string) {
    return this._arguments.find(arg => arg.name() === name || humanReadableArgName(arg) === name)
  }

  destory(): void {
    this.clear()
    this._subCommand = []
    this._options = []
    this._arguments = []
  }
}
