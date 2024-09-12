import type { Argument } from './argument'

export function splitOptionFlags(flags: string) {
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

export function humanReadableArgName(arg: Argument) {
  const nameOutput = arg.name() + (arg.variadic === true ? '...' : '')
  return arg.required ? `<${nameOutput}>` : `[${nameOutput}]`
}
