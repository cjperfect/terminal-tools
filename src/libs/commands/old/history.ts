export interface HistoryItem {
  input: string
  command: string
}

export class History {
  private stack: HistoryItem[]

  constructor() {
    this.stack = []
  }

  push(item: HistoryItem) {
    this.stack.push(item)
  }

  matchHistory(input: string) {
    const command = input.split(/\s/)[0]
    const matchedCommand = this.stack
      .filter(item => command.match(item.command))
      .reduce<string[]>((pre, cur) => {
        if (!pre.includes(cur.command)) {
          pre.push(cur.command)
        }
        return pre
      }, [])

    return this.stack.filter((item) => {
      if (matchedCommand.includes(item.command)) {
        return item.input.match(input)
      }
      return false
    })
  }

  destory() {
    this.stack = []
  }

  get historyList() {
    return this.stack
  }
}
