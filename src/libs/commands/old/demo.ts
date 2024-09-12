class Options {
  _flags: string
  _description?: string

  constructor(name: string, description?: string) {
    this._flags = name
    this._description = description
  }
}

class Arguments {
  _name: string
  _description?: string

  constructor(name: string, description?: string) {
    this._name = name
    this._description = description
  }
}

class Command {
  _name: string = ''
  _description?: string
  _version?: string = '0.0.1'
  private _subCommands: Command[] = []
  private _registerArguments: Arguments[] = []
  private _options: Options[] = []

  constructor(name?: string) {
    this._name = name || ''
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

  version(val?: string) {
    if (!val) {
      return this
    }
    this._version = val
    return this
  }

  parse(_args: string[]) {

  }

  subCommand(name: string, description?: string) {
    const command = this.createSubCommand(name)

    if (description) {
      command.description(description)
    }

    return command
  }

  private registerSubCommand() {

  }

  private createSubCommand(name: string) {
    return new Command(name)
  }

  argumnets() {
    return this
  }

  argumnet() {

  }

  private createArguments(name: string, description?: string) {
    return new Arguments(name, description)
  }

  options() {

  }

  registerOptions() {

  }

  private createOptions(name: string, description?: string) {
    return new Options(name, description)
  }
}

const program = new Command()

program
  .name('git')
  .description('A show current path command.')
  .version('0.0.1')

program
  .subCommand('status')
