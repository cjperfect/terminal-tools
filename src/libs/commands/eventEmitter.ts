import { isFunction } from 'lodash-es'

export class EventEmitter {
  private _events: Map<string, Fn[]>

  constructor() {
    this._events = new Map()
  }

  on(key: string, fn: Fn) {
    if (this._events.has(key)) {
      this._events.get(key)!.push(fn)
    } else {
      this._events.set(key, [fn])
    }
  }

  emit(key: string, ...args: any) {
    if (this._events.has(key)) {
      const fns = this._events.get(key)!
      fns.forEach((fn) => {
        if (isFunction(fn)) {
          fn(...args)
        }
      })
    }
  }

  off(key: string, fn?: Fn) {
    if (!this._events.has(key)) {
      return
    }

    if (fn) {
      const fns = this._events.get(key)!
      const index = fns.findIndex(item => item === fn)
      if (index !== -1) {
        this._events.set(key, [...fns].splice(index, 1))
      }
    } else {
      this._events.delete(key)
    }
  }

  clear() {
    this._events.clear()
  }
}
