declare type Data<T = any> = Record<string, T>

declare type Arrayable<T> = Array<T> | T

declare type Fn<P extends any[] = any, R = any> = (...args: P) => R
