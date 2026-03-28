import { renderHook, act } from '@testing-library/react'
import { test, expect } from 'vitest'
import { useDesign } from './useDesign'

test('initial state has oem profile and matte material', () => {
  const { result } = renderHook(() => useDesign())
  expect(result.current.design.profile).toBe('oem')
  expect(result.current.design.material).toBe('matte')
})

test('setProfile updates profile', () => {
  const { result } = renderHook(() => useDesign())
  act(() => result.current.setProfile('sa'))
  expect(result.current.design.profile).toBe('sa')
})

test('setColor updates base_color', () => {
  const { result } = renderHook(() => useDesign())
  act(() => result.current.setColor('#FF5F57'))
  expect(result.current.design.base_color).toBe('#FF5F57')
})
