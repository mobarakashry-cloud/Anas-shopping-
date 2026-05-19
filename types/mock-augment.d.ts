import { Product as BaseProduct } from './lib/mock-data'

declare module './lib/mock-data' {
  interface Product extends BaseProduct {
    inStock?: boolean
    views?: number
  }
}
