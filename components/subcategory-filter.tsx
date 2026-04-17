'use client'

import { Subcategory } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface SubcategoryFilterProps {
  subcategories: Subcategory[]
  selectedSubcategory: string | null
  onSubcategoryChange: (subcategoryId: string | null) => void
}

export function SubcategoryFilter({ 
  subcategories, 
  selectedSubcategory, 
  onSubcategoryChange 
}: SubcategoryFilterProps) {
  if (subcategories.length === 0) return null

  return (
    <div className="pb-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onSubcategoryChange(null)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0",
            selectedSubcategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          All
        </button>
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => onSubcategoryChange(subcategory.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0 whitespace-nowrap",
              selectedSubcategory === subcategory.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {subcategory.name}
          </button>
        ))}
      </div>
    </div>
  )
}
