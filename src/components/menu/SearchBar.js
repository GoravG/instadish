'use client'
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({ searchQuery, onSearchChange, onToggleFilters }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search dishes, ingredients..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button
        onClick={onToggleFilters}
        className="flex items-center gap-1 p-2 rounded-md border border-gray-200 hover:bg-gray-50"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm">Filters</span>
      </button>
    </div>
  );
}
