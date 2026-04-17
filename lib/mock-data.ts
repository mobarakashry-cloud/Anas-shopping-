export type Category = 'all' | 'electronics' | 'fashion' | 'home' | 'handmade' | 'books' | 'toys' | 'vehicles'

export type Condition = 'new' | 'used' | 'handmade'

export interface Subcategory {
  id: string
  name: string
  category: Category
}

export interface Product {
  id: string
  name: string
  price: number
  category: Category
  subcategory: string
  condition: Condition
  quantity: number
  description: string
  image: string
  video?: string
  hasPaidVideoPromotion?: boolean
  rating: number
  reviews: number
  seller: {
    name: string
    rating: number
    id: string
  }
  specifications: {
    material?: string
    color?: string
    size?: string
    brand?: string
    [key: string]: string | undefined
  }
  isFeatured?: boolean
  createdAt: Date
}

export const categories = [
  { id: 'all', name: 'All Products', icon: '' },
  { id: 'electronics', name: 'Electronics', icon: '' },
  { id: 'fashion', name: 'Fashion', icon: '' },
  { id: 'home', name: 'Home & Kitchen', icon: '' },
  { id: 'handmade', name: 'Handmade', icon: '' },
  { id: 'books', name: 'Books', icon: '' },
  { id: 'toys', name: 'Toys', icon: '' },
  { id: 'vehicles', name: 'Vehicles', icon: '' },
]

export const subcategories: Subcategory[] = [
  // Electronics
  { id: 'mobile-phones', name: 'Mobile Phones', category: 'electronics' },
  { id: 'laptops-accessories', name: 'Laptops & Accessories', category: 'electronics' },
  { id: 'smart-home', name: 'Smart Home Devices', category: 'electronics' },
  { id: 'headphones-audio', name: 'Headphones & Audio', category: 'electronics' },
  
  // Fashion
  { id: 'mens-clothing', name: "Men's Clothing", category: 'fashion' },
  { id: 'womens-clothing', name: "Women's Clothing", category: 'fashion' },
  { id: 'shoes-bags', name: 'Shoes & Bags', category: 'fashion' },
  { id: 'accessories', name: 'Accessories', category: 'fashion' },
  
  // Home & Kitchen
  { id: 'furniture', name: 'Furniture', category: 'home' },
  { id: 'kitchen-tools', name: 'Kitchen Tools', category: 'home' },
  { id: 'home-decor', name: 'Home Decor', category: 'home' },
  { id: 'cleaning-supplies', name: 'Cleaning Supplies', category: 'home' },
  
  // Handmade
  { id: 'handmade-decor', name: 'Handmade Decor', category: 'handmade' },
  { id: 'handwoven-fabrics', name: 'Handwoven Fabrics', category: 'handmade' },
  { id: 'artistic-gifts', name: 'Artistic Gifts', category: 'handmade' },
  
  // Books
  { id: 'novels', name: 'Novels', category: 'books' },
  { id: 'educational', name: 'Educational', category: 'books' },
  { id: 'childrens-books', name: "Children's Books", category: 'books' },
  
  // Toys
  { id: 'educational-toys', name: 'Educational Toys', category: 'toys' },
  { id: 'electronic-games', name: 'Electronic Games', category: 'toys' },
  { id: 'board-games', name: 'Board Games', category: 'toys' },
  
  // Vehicles
  { id: 'new-cars', name: 'New Cars', category: 'vehicles' },
  { id: 'used-cars', name: 'Used Cars', category: 'vehicles' },
  { id: 'motorbikes', name: 'Motorbikes', category: 'vehicles' },
  { id: 'bicycles', name: 'Bicycles', category: 'vehicles' },
]

export const products: Product[] = [
  // Featured Products
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 1299,
    category: 'electronics',
    subcategory: 'mobile-phones',
    condition: 'new',
    quantity: 15,
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Perfect condition with full warranty.',
    image: '/placeholder.svg?height=300&width=300',
    video: 'https://example.com/iphone-video.mp4',
    hasPaidVideoPromotion: true,
    rating: 4.8,
    reviews: 234,
    seller: { name: 'TechStore Pro', rating: 4.9, id: 'seller1' },
    specifications: {
      brand: 'Apple',
      color: 'Natural Titanium',
      storage: '256GB',
      screen: '6.7 inch'
    },
    isFeatured: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Handwoven Silk Scarf',
    price: 89,
    category: 'handmade',
    subcategory: 'handwoven-fabrics',
    condition: 'handmade',
    quantity: 3,
    description: 'Beautiful handwoven silk scarf with traditional patterns. Each piece is unique and crafted with care.',
    image: '/placeholder.svg?height=300&width=300',
    video: 'https://example.com/scarf-making.mp4',
    rating: 5.0,
    reviews: 47,
    seller: { name: 'Artisan Crafts', rating: 4.8, id: 'seller2' },
    specifications: {
      material: 'Pure Silk',
      color: 'Multi-color',
      size: '180cm x 60cm',
      care: 'Hand wash only'
    },
    isFeatured: true,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Gaming Laptop RTX 4070',
    price: 1899,
    category: 'electronics',
    subcategory: 'laptops-accessories',
    condition: 'new',
    quantity: 8,
    description: 'High-performance gaming laptop with RTX 4070, 32GB RAM, and 1TB SSD. Perfect for gaming and content creation.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.7,
    reviews: 156,
    seller: { name: 'Gaming Heaven', rating: 4.7, id: 'seller3' },
    specifications: {
      brand: 'ASUS ROG',
      processor: 'Intel i9-13980HX',
      graphics: 'RTX 4070',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD'
    },
    isFeatured: true,
    createdAt: new Date('2024-01-18')
  },
  {
    id: '4',
    name: 'Designer Leather Handbag',
    price: 249,
    category: 'fashion',
    subcategory: 'shoes-bags',
    condition: 'new',
    quantity: 12,
    description: 'Elegant leather handbag with multiple compartments. Perfect for daily use or special occasions.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.6,
    reviews: 89,
    seller: { name: 'Fashion Elite', rating: 4.8, id: 'seller4' },
    specifications: {
      material: 'Genuine Leather',
      color: 'Black',
      dimensions: '35cm x 28cm x 12cm',
      brand: 'Luxury Bags Co.'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-22')
  },
  {
    id: '5',
    name: 'Wooden Coffee Table',
    price: 329,
    category: 'home',
    subcategory: 'furniture',
    condition: 'new',
    quantity: 5,
    description: 'Modern wooden coffee table with storage drawer. Solid oak construction with natural finish.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.5,
    reviews: 67,
    seller: { name: 'Home Furniture Plus', rating: 4.6, id: 'seller5' },
    specifications: {
      material: 'Solid Oak Wood',
      color: 'Natural Wood',
      size: '120cm x 60cm x 45cm',
      assembly: 'Required'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-19')
  },
  {
    id: '6',
    name: 'Educational Building Blocks Set',
    price: 45,
    category: 'toys',
    subcategory: 'educational-toys',
    condition: 'new',
    quantity: 25,
    description: 'Colorful building blocks set for kids aged 3+. Develops creativity and motor skills.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.9,
    reviews: 312,
    seller: { name: 'Kids Paradise', rating: 4.9, id: 'seller6' },
    specifications: {
      material: 'Non-toxic Plastic',
      pieces: '150 pieces',
      ageRange: '3+ years',
      brand: 'Smart Kids'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-21')
  },
  {
    id: '7',
    name: 'The Great Gatsby - Classic Novel',
    price: 15,
    category: 'books',
    subcategory: 'novels',
    condition: 'new',
    quantity: 50,
    description: 'Classic American novel by F. Scott Fitzgerald. Hardcover edition with beautiful illustrations.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.8,
    reviews: 445,
    seller: { name: 'Book Haven', rating: 4.7, id: 'seller7' },
    specifications: {
      author: 'F. Scott Fitzgerald',
      pages: '180 pages',
      format: 'Hardcover',
      language: 'English'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-17')
  },
  {
    id: '8',
    name: 'Used Toyota Camry 2020',
    price: 18500,
    category: 'vehicles',
    subcategory: 'used-cars',
    condition: 'used',
    quantity: 1,
    description: 'Well-maintained Toyota Camry 2020 with only 35,000 miles. Full service history, single owner.',
    image: '/placeholder.svg?height=300&width=300',
    video: 'https://example.com/camry-tour.mp4',
    rating: 4.6,
    reviews: 12,
    seller: { name: 'AutoDeals Pro', rating: 4.5, id: 'seller8' },
    specifications: {
      brand: 'Toyota',
      model: 'Camry LE',
      year: '2020',
      mileage: '35,000 miles',
      color: 'Silver',
      transmission: 'Automatic'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-16')
  },
  {
    id: '9',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 299,
    category: 'electronics',
    subcategory: 'headphones-audio',
    condition: 'new',
    quantity: 20,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.7,
    reviews: 178,
    seller: { name: 'Audio World', rating: 4.8, id: 'seller9' },
    specifications: {
      brand: 'Sony',
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      battery: '30 hours'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-23')
  },
  {
    id: '10',
    name: 'Handmade Ceramic Vase',
    price: 65,
    category: 'handmade',
    subcategory: 'handmade-decor',
    condition: 'handmade',
    quantity: 4,
    description: 'Unique handmade ceramic vase with intricate patterns. Perfect for flowers or as standalone decor.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.9,
    reviews: 34,
    seller: { name: 'Pottery Studio', rating: 5.0, id: 'seller10' },
    specifications: {
      material: 'Ceramic',
      color: 'Blue & White',
      height: '30cm',
      handmade: 'Yes'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-24')
  },
  {
    id: '11',
    name: "Men's Casual T-Shirt",
    price: 29,
    category: 'fashion',
    subcategory: 'mens-clothing',
    condition: 'new',
    quantity: 100,
    description: 'Comfortable cotton t-shirt available in multiple colors. Perfect for everyday wear.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.4,
    reviews: 523,
    seller: { name: 'Fashion Hub', rating: 4.6, id: 'seller11' },
    specifications: {
      material: '100% Cotton',
      sizes: 'S, M, L, XL, XXL',
      colors: 'Multiple',
      brand: 'ComfortWear'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-25')
  },
  {
    id: '12',
    name: 'Smart Home Security Camera',
    price: 89,
    category: 'electronics',
    subcategory: 'smart-home',
    condition: 'new',
    quantity: 30,
    description: '1080p HD security camera with night vision, motion detection, and mobile app control.',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.5,
    reviews: 267,
    seller: { name: 'Smart Home Store', rating: 4.7, id: 'seller12' },
    specifications: {
      resolution: '1080p HD',
      nightVision: 'Yes',
      connectivity: 'WiFi',
      storage: 'Cloud & SD Card'
    },
    isFeatured: false,
    createdAt: new Date('2024-01-26')
  },
]

export const getSubcategoriesByCategory = (category: Category) => {
  if (category === 'all') return subcategories
  return subcategories.filter(sub => sub.category === category)
}

export const getProductsByCategory = (category: Category) => {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}

export const getProductsBySubcategory = (subcategoryId: string) => {
  return products.filter(p => p.subcategory === subcategoryId)
}

export const getFeaturedProducts = () => {
  return products.filter(p => p.isFeatured)
}

export const sortProducts = (products: Product[], sortBy: 'price-low' | 'price-high' | 'rating' | 'newest') => {
  switch (sortBy) {
    case 'price-low':
      return [...products].sort((a, b) => a.price - b.price)
    case 'price-high':
      return [...products].sort((a, b) => b.price - a.price)
    case 'rating':
      return [...products].sort((a, b) => b.rating - a.rating)
    case 'newest':
      return [...products].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    default:
      return products
  }
}
