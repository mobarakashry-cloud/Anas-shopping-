'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { CategoryFilter } from '@/components/category-filter';
import { ProductCard } from '@/components/product-card';
import { FilterSidebar } from '@/components/filter-sidebar';
import { BottomNav } from '@/components/bottom-nav';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Filter and Sort Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FilterSidebar />
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
