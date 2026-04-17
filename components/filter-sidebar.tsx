'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 200]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Condition */}
          <div>
            <h3 className="font-semibold mb-3">Condition</h3>
            <div className="space-y-2">
              {['new', 'used', 'handmade'].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox id={condition} />
                  <Label htmlFor={condition} className="capitalize cursor-pointer">
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range (π)</h3>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200}
                step={5}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{priceRange[0]} π</span>
                <span>{priceRange[1]} π</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold mb-3">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="cursor-pointer">
                    {rating} stars & up
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* In Stock */}
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" />
              <Label htmlFor="in-stock" className="cursor-pointer">
                In Stock Only
              </Label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              Clear All
            </Button>
            <Button className="flex-1">Apply</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
