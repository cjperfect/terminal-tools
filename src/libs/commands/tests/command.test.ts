import { describe, it } from 'vitest'
import { Command } from '../command'

describe('command', () => {
  it('should ', () => {
    const command = new Command('git')

    command.description('code manage tool').version('0.0.1')

    command.option('-v,--version', 'Display command version')

    command.subComamnd('status <file>', 'show file status').option('-p,--path', 'file path')

    command.parse(['status', '--path=/usr/local', 'command.ts'])
  })
})
