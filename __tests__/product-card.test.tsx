import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { products } from '@/lib/mock-data'

describe('ProductCard', () => {
	it('renders product info and seller name', async () => {
		console.log('product-card: before import')
		vi.mock('@/components/ui/card', () => ({
			Card: (props) => React.createElement('div', props, props.children),
			CardContent: (props) => React.createElement('div', props, props.children),
		}))
		vi.mock('@/components/ui/button', () => ({
			Button: (props) => React.createElement('button', props, props.children),
		}))
		vi.mock('@/components/ui/badge', () => ({
			Badge: (props) => React.createElement('span', props, props.children),
		}))
		vi.mock('lucide-react', () => {
			const ReactReq = require('react')
			const handler = { get() { return (p) => ReactReq.createElement('span', p, null) } }
			return new Proxy({}, handler)
		})
		vi.mock('next/image', () => ({ __esModule: true, default: (props) => React.createElement('img', props) }))
		const { ProductCard } = await import('@/components/product-card')
		console.log('product-card: after import')
		const product = products[0]
		render(React.createElement(ProductCard, { product }))

		expect(screen.getByText(product.name)).toBeInTheDocument()
		expect(screen.getByText(String(product.price))).toBeInTheDocument()
		expect(screen.getByText(new RegExp(product.seller.name))).toBeInTheDocument()
	})
})

