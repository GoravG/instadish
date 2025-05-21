'use client'
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FilterSection({ 
  vegFilter, onVegFilterChange,
  activeCategory, onCategoryChange,
  categories, onReset,
  sortBy, onSortChange
}) {
  return (
    <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3 sm:mb-4">
      <div className="flex flex-col space-y-4">
        <div className="w-full">
          <Label htmlFor="diet-preference" className="text-sm font-medium mb-1.5 block text-gray-700 dark:text-gray-200">Diet Preference</Label>
          <Select value={vegFilter} onValueChange={onVegFilterChange}>
            <SelectTrigger id="diet-preference" className="w-full h-11 sm:h-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              <SelectValue placeholder="All Dishes" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              <SelectItem value="all">All Dishes</SelectItem>
              <SelectItem value="veg">Vegetarian Only</SelectItem>
              <SelectItem value="nonveg">Non-Vegetarian Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label htmlFor="category-select" className="text-sm font-medium mb-1.5 block text-gray-700 dark:text-gray-200">Category</Label>
          <Select
            value={activeCategory.toString()}
            onValueChange={(value) => onCategoryChange(parseInt(value))}
          >
            <SelectTrigger id="category-select" className="w-full h-11 sm:h-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              <SelectItem value="0">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label htmlFor="sort-select" className="text-sm font-medium mb-1.5 block text-gray-700 dark:text-gray-200">Sort By</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger id="sort-select" className="w-full h-11 sm:h-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-5 flex justify-center sm:justify-end">
        <button
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2.5 sm:py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-800 dark:text-gray-100"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
