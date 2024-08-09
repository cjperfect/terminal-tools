import type { MutableRefObject } from 'react'
import { isFunction } from 'lodash-es'

type TargetValue<T> = T | undefined | null

type TargetType = HTMLElement | Element | Document | Window

export type BasicTarget<T extends TargetType = Element> =
  (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultTarget?: T) {
  if (!target)
    return defaultTarget

  let targetElement: TargetValue<T>
  if (isFunction(target))
    targetElement = target()
  else if ('current' in target)
    targetElement = target.current
  else
    targetElement = target

  return targetElement
}
