import { assert, describe, it } from 'vitest'
import { Argument } from '../argument'

describe('command argument', () => {
  it('should correctly parse argument with valid input', () => {
    const defaultArg = new Argument('name', 'project name')

    assert.equal(defaultArg.name(), 'name')
    assert.isTrue(defaultArg.required)

    const requiredArg = new Argument('<name>', 'project name')
    assert.isTrue(requiredArg.required)

    const optionalArg = new Argument('[name]', 'project name')
    assert.isFalse(optionalArg.required)

    const variadicArg = new Argument('[arg...]', 'get all params')
    assert.isTrue(variadicArg.variadic)
  })

  it('should return default values when argument are provided', () => {
    const arg = new Argument('name', 'project')

    const defaultValue = 'ccc'
    const defaultDescription = 'bbb'

    arg.default(defaultValue, defaultDescription)

    assert.equal(arg.defaultvalue, defaultValue)
    assert.equal(arg.defaultValueScription, defaultDescription)
  })
})
