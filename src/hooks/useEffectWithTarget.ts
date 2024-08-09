import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'
import { safeArray } from '../utils/array'
import type { BasicTarget } from '../utils/dom'
import { getTargetElement } from '../utils/dom'
import { useUnMount } from './useUnMount'

function depsAreSame(oldDeps: DependencyList, deps: DependencyList) {
  if (oldDeps === deps)
    return true
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i]))
      return false
  }

  return true
}

export function useEffectWithTarget(effect: EffectCallback, deps: DependencyList, target: Arrayable<BasicTarget<any>>) {
  const hasInitRef = useRef(false)
  const lastElementRef = useRef<BasicTarget<any>[]>([])
  const lastDepsRef = useRef<DependencyList>([])

  const unLoadRef = useRef<any>()

  useEffect(() => {
    const els = safeArray<BasicTarget>(target).map(target => getTargetElement(target))

    if (!hasInitRef.current) {
      hasInitRef.current = true
      lastElementRef.current = els
      lastDepsRef.current = deps
      unLoadRef.current = effect?.()

      return
    }

    if (els.length !== lastElementRef.current.length
      || !depsAreSame(els, lastElementRef.current)
      || !depsAreSame(deps, lastDepsRef.current)
    ) {
      unLoadRef.current?.()

      lastElementRef.current = els
      lastDepsRef.current = deps
      unLoadRef.current = effect()
    }
  })

  useUnMount(() => {
    unLoadRef.current?.()
    hasInitRef.current = false
  })
}
