import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import ProfileBar from './ProfileBar'

test('calls onProfileChange when chip clicked', () => {
  const onChange = vi.fn()
  render(<ProfileBar current="oem" onProfileChange={onChange} />)
  fireEvent.click(screen.getByText('Cherry'))
  expect(onChange).toHaveBeenCalledWith('cherry')
})

test('highlights current profile with yellow styling', () => {
  render(<ProfileBar current="sa" onProfileChange={vi.fn()} />)
  const btn = screen.getByText('SA')
  expect(btn.className).toContain('kc-yellow')
})
