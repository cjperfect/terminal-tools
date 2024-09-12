import { splitOptionFlags } from './util'

export class Option {
  flags: string // raw flags
  short?: string // parsed short option
  long?: string // parsed long option
  description: string // option description
  required?: boolean // option is required
  optional?: boolean // option is optional
  variadic?: boolean // option is get all arguments
  defaultValue?: unknown // option default value
  defaultValueDescription?: string // option default value description

  constructor(flags: string, description?: string) {
    this.flags = flags
    this.description = description || ''

    this.required = flags.includes('<')
    this.optional = flags.includes('[')
    this.variadic = /\w\.\.\.[>\]]$/.test(flags)
    const { shortFlag, longFlag } = splitOptionFlags(flags)
    this.long = longFlag
    this.short = shortFlag
  }

  default(value: unknown, description?: string) {
    this.defaultValue = value
    this.defaultValueDescription = description
    return this
  }

  is(arg: string) {
    return this.long === arg || this.short === arg
  }

  name() {
    if (this.long) {
      return this.long.replace(/^--/, '')
    }
    return this?.short?.replace(/^-/, '')
  }

  isBoolean() {
    return !this.required && !this.optional
  }
}
