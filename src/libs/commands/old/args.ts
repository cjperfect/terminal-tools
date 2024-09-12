/**
 * @example
 * new Args('string','description')
 * new Args('<string>','description')
 * new Args('[string]','description')
 * new Args('string...','description')
 */
export class Args {
  private _name: string = ''
  private _description: string = ''
  private _required: boolean = true
  private _defaultValue?: string
  private _defaultValueDescription?: string
  private _variadic: boolean = false

  constructor(name: string, description?: string) {
    this._description = description || ''

    switch (name[0]) {
      case '<':
        this._required = true
        this._name = name.slice(1, -1)
        break
      case '[':
        this._required = false
        this._name = name.slice(1, -1)
        break
      default:
        this._name = name
        break
    }

    if (this._name.length > 3 && this._name.slice(-3) === '...') {
      this._variadic = true
      this._name = this._name.slice(0, -3)
    }
  }

  default(name?: string, description?: string) {
    this._defaultValue = name
    this._defaultValueDescription = description
    return this
  }

  argRequired() {
    this._required = true
    return this
  }

  argOption() {
    this._required = false
    return this
  }

  get name() {
    return this._name
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

  get required() {
    return this._required
  }

  get variadic() {
    return this._variadic
  }
}
