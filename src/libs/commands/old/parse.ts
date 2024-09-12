export type ArgType = 'flag' | 'option' | 'args'
export type ArgKind = 'short' | 'long'

export const EMPTY_INPUT = 'EMPTY_INPUT'

export interface ParsedArg {
  kind?: ArgKind
  type: ArgType
  param: string
  value: string
  prev: ParsedArg | null
  next: ParsedArg | null
}

export function getArgsByKind(args: ParsedArg[], kind?: ArgKind) {
  return args.filter(arg => arg.kind === kind)
}

export function getArgsByType(args: ParsedArg[], type: ArgType) {
  return args.filter(arg => arg.type === type)
}

export class Parsed {
  private readonly _command: string
  private readonly _input: string
  private readonly _args: ParsedArg[]
  private readonly _longArgs: ParsedArg[]
  private readonly _shortArgs: ParsedArg[]
  private readonly _otherArgs: ParsedArg[]
  private readonly _flagArgs: ParsedArg[]
  private readonly _optionArgs: ParsedArg[]

  constructor(command: string, input: string, args: ParsedArg[]) {
    this._command = command
    this._input = input
    this._args = args
    this._longArgs = getArgsByKind(args, 'long')
    this._shortArgs = getArgsByKind(args, 'short')
    this._otherArgs = getArgsByType(args, 'args')
    this._flagArgs = getArgsByType(args, 'flag')
    this._optionArgs = getArgsByType(args, 'option')
  }

  get args() {
    return this._args
  }

  get longArgs() {
    return this._longArgs
  }

  get shortArgs() {
    return this._shortArgs
  }

  get optionArgs() {
    return this._optionArgs
  }

  get flagArgs() {
    return this._flagArgs
  }

  get otherArgs() {
    return this._otherArgs
  }

  get command() {
    return this._command
  }

  get input() {
    return this._input
  }

  get isEmptyInput() {
    return !this.input.length
  }

  get isEmpty() {
    return this.command === EMPTY_INPUT
  }

  get isEmptyArgs() {
    return !this.args.length
  }

  get isEmptyLongArgs() {
    return !this.longArgs.length
  }

  get isEmptyShortArgs() {
    return !this.shortArgs.length
  }

  get isEmptyOtherArgs() {
    return !this.otherArgs.length
  }

  get isEmptyOptionArgs() {
    return !this.optionArgs.length
  }

  get isEmptyFlagArgs() {
    return !this.flagArgs.length
  }
}

function createNormalArg(arg: string): ParsedArg {
  if (arg.startsWith('--') || arg.startsWith('-')) {
    const kind = arg.startsWith('--') ? 'long' : 'short'
    const argValue = arg.replace(/(--|-)/, '')
    if (arg.includes('=')) {
      const [param, value] = argValue.split('=')
      return {
        kind,
        type: 'option',
        param,
        value,
        prev: null,
        next: null,
      }
    }

    return {
      kind,
      type: 'flag',
      param: argValue,
      value: arg,
      prev: null,
      next: null,
    }
  }

  return {
    type: 'args',
    param: arg,
    value: arg,
    prev: null,
    next: null,
  }
}

function parseArgs(args: string[]): ParsedArg[] {
  if (args.length === 1) {
    return []
  }

  const result: ParsedArg[] = []

  function createLinkArg(index: number = 1) {
    const arg = args[index]

    if (!arg) {
      return null
    }

    const parsedArg = createNormalArg(arg)

    if (result.length) {
      parsedArg.prev = result[result.length - 1]
    }

    if (index + 1 < args.length) {
      parsedArg.next = createLinkArg(index + 1)
    }

    result.push(parsedArg)

    return parsedArg
  }

  createLinkArg()

  return result
}

export function parse(input: string = ''): Parsed {
  const args = input.split(/\s/).filter(arg => arg)

  if (!args.length) {
    return new Parsed(EMPTY_INPUT, input, [])
  }

  return new Parsed(args[0], input, parseArgs(args))
}
