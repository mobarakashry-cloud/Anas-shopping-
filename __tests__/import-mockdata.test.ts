import { describe, it, expect } from 'vitest'
import { products } from '../lib/mock-data'

describe('import mock-data', () => {
  it('loads products array', () => {
    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBeGreaterThan(0)
  })
})
