import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import MaterialPanel from './MaterialPanel'

test('calls onChange when material chip clicked', () => {
  const onChange = vi.fn()
  render(<MaterialPanel current="matte" onChange={onChange} />)
  fireEvent.click(screen.getByText('光泽'))
  expect(onChange).toHaveBeenCalledWith('gloss')
})

test('highlights current material with red styling', () => {
  render(<MaterialPanel current="transparent" onChange={vi.fn()} />)
  const chip = screen.getByText('透明')
  expect(chip.className).toContain('kc-red')
})
