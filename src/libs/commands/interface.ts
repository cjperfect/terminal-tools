export type CommandResultType = 'version' | 'help' | 'list' | 'custom'

interface BaseCommandResult<T extends CommandResultType, S extends Data> {
  type: T
  struct?: S
}

interface VersionStruct {
  value: string
}

interface HelpStruct {

}

interface ListStruct {

}

interface CustomStruct extends Data {

}

interface CommandStruct {
  version: VersionStruct
  help: HelpStruct
  list: ListStruct
  custom: CustomStruct
}

type Struct<T extends CommandResultType> = T extends keyof CommandStruct ? CommandStruct[T] : Data

/**
 * @example
 * const example: CommandResult<'version'> = {
 *  type: 'version',
 *  struct: {
 *    value: '1',
 * },
 }
 */
export type CommandResult<T extends CommandResultType = 'custom'> = BaseCommandResult<T, Struct<T>>

export type ActionHandler<P = any[], R extends CommandResultType = 'custom'> = (args?: P) => CommandResult<R>
