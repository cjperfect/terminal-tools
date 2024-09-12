export class Argument {
  _name: string
  required: boolean
  description: string
  variadic: boolean
  defaultvalue?: unknown
  defaultValueScription?: string

  constructor(name: string, description?: string) {
    this.description = description || ''
    this.variadic = false

    switch (name[0]) {
      case '<':
        this.required = true
        this._name = name.slice(1, -1)
        break
      case '[':
        this.required = false
        this._name = name.slice(1, -1)
        break
      default:
        this.required = true
        this._name = name
        break
    }

    if (this._name.length > 3 && this._name.slice(-3) === '...') {
      this.variadic = true
      this._name = this._name.slice(0, -3)
    }
  }

  name() {
    return this._name
  }

  default(value: unknown, description?: string) {
    this.defaultvalue = value
    this.defaultValueScription = description
    return this
  }

  argRequired() {
    this.required = true
    return this
  }

  argOptional() {
    this.required = false
    return this
  }
}
