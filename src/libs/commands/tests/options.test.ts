import { assert, describe, it } from 'vitest'
import { Option } from '../option'

describe('command option', () => {
  it('should correctly parse options with valid input', () => {
    const option = new Option('-p, --papper <name> [description] [args...]', 'add papper')
    assert.equal(option.short, '-p')
    assert.equal(option.long, '--papper')
    assert.equal(option.description, 'add papper')
    assert.equal(option.name(), 'papper')
    assert.isTrue(option.is('-p'))
    assert.isTrue(option.is('--papper'))
    assert.isTrue(option.required)
    assert.isTrue(option.optional)
    assert.isTrue(option.variadic)

    const shortOption = new Option('-p', 'add papper')
    assert.equal(shortOption.short, '-p')
    assert.isUndefined(shortOption.long)

    const longOption = new Option('--papper')
    assert.equal(longOption.long, '--papper')
    assert.isUndefined(longOption.short)

    const requiredOption = new Option('-o <name>')
    assert.isTrue(requiredOption.required)

    const optionalOption = new Option('-o [name]')
    assert.isTrue(optionalOption.optional)

    const variadicOption = new Option('-o [arg...]')
    assert.isTrue(variadicOption.variadic)
  })

  it('should return default values when options are provided', () => {
    const option = new Option('-p', 'add papper')

    const defaultValue = 'ccc'
    const defaultDescription = 'bbb'

    option.default(defaultValue, defaultDescription)
    assert.equal(option.defaultValue, defaultValue)
    assert.equal(option.defaultValueDescription, defaultDescription)
  })
})
