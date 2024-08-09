export function safeArray<T>(data: Arrayable<T> | undefined | null): T[] {
  if (!data && data !== 0)
    return [] as T[]

  return (Array.isArray(data) ? data : [data]) as T[]
}
