function splitOptionFlags(flags: string) {
  let shortFlag: string | undefined
  let longFlag: string | undefined

  const flagParts = flags.split(/[ |,]+/)

  if (flagParts.length > 1 && !/^[[<]\]/.test(flagParts[1])) {
    shortFlag = flagParts.shift()
  }

  longFlag = flagParts.shift()

  if (!shortFlag && longFlag && /^-[^-]$/.test(longFlag)) {
    shortFlag = longFlag
    longFlag = undefined
  }

  return { shortFlag, longFlag }
}

export class Option {
  private _flags: string
  private _short?: string
  private _long?: string
  private _description?: string
  private _required: boolean = true
  private _optional: boolean = false
  private _variadic: boolean = false
  private _mandatory: boolean = false
  private _defaultValue?: string
  private _defaultValueDescription?: string
  private _hidden: boolean = false

  constructor(flags: string, description?: string) {
    this._flags = flags
    this._description = description || ''

    this._required = flags.includes('<')
    this._optional = flags.includes('[')
    this._variadic = /\w\.\.\.[>\]]$/.test(flags)

    const optionFlags = splitOptionFlags(flags)
    this._short = optionFlags.shortFlag
    this._long = optionFlags.longFlag
  }

  default(value: string, description?: string) {
    this._defaultValue = value
    this._defaultValueDescription = description
    return this
  }

  hideHelp(hide: boolean = true) {
    this._hidden = !!hide
    return this
  }

  is(arg: string) {
    return this._short === arg || this._long === arg
  }

  get flags() {
    return this._flags
  }

  get name() {
    if (this._long) {
      return this._long.replace(/^--/, '')
    }
    return this._short?.replace(/^-/, '')
  }

  get description() {
    return this._description
  }

  get defaultValue() {
    return this._defaultValue
  }

  get defaultValueDescription() {
    return this._defaultValueDescription
  }

  get hidden() {
    return this._hidden
  }

  get required() {
    return this._required
  }

  get optional() {
    return this._optional
  }

  get variadic() {
    return this._variadic
  }

  get mandatory() {
    return this._mandatory
  }
}
