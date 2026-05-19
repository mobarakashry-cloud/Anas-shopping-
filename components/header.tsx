'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Heart, User, Search, Menu, Globe, Smartphone, Watch, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [
    { label: 'موبايلات', Icon: Smartphone },
    { label: 'ساعات', Icon: Watch },
    { label: 'إلكترونيات', Icon: Monitor },
  ];

  return (
    <header dir="rtl" className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-amber-400 text-amber-50 font-bold text-lg">
                أنس
              </div>
              <span className="hidden sm:inline-block font-bold text-lg text-purple-600">تسوق أنس</span>
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pr-10 pl-4"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-amber-400 text-amber-900">
                    3
                  </Badge>
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-amber-400 text-amber-900">
                    2
                  </Badge>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {/* Categories - desktop */}
        <nav className="hidden md:flex items-center justify-center border-t pt-3">
          <ul className="flex gap-3 overflow-x-auto">
            {categories.map(({ label, Icon }) => (
              <li key={label}>
                <Link href={`/search?category=${encodeURIComponent(label)}`} className="inline-flex items-center">
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-amber-100 text-sm font-medium hover:to-amber-400 transition-transform transform hover:-translate-y-0.5 shadow-sm flex items-center gap-2">
                    <Icon className="h-4 w-4 text-amber-200" />
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Categories - mobile (scrollable) */}
        <div className="md:hidden pt-3 pb-2">
          <div className="flex gap-3 overflow-x-auto px-1">
            {categories.map(({ label, Icon }) => (
              <Link key={label} href={`/search?category=${encodeURIComponent(label)}`} className="flex-shrink-0">
                <span className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-amber-100 text-sm font-medium shadow-sm flex items-center gap-2">
                  <Icon className="h-4 w-4 text-amber-200" />
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
