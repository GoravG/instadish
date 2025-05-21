'use client'

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, ThumbsUp, ChefHat, Flame, ChevronDown, ChevronUp } from "lucide-react";

// Standard Veg/Non-veg icons as components
const VegIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" className="stroke-green-600" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" className="fill-green-600" />
  </svg>
);

const NonVegIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" className="stroke-red-600" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" className="fill-red-600" />
  </svg>
);

export function DishCard({ dish }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to render spice level indicators
  const renderSpiceLevel = (level) => {
    const maxLevel = 5;
    return (
      <div className="flex items-center">
        {[...Array(maxLevel)].map((_, i) => (
          <span
            key={i}
            className={`mx-0.5 w-2 h-2 rounded-full inline-block ${
              i < level ? "bg-red-500" : "bg-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-xs font-medium text-gray-700">{level}/{maxLevel}</span>
      </div>
    );
  };
  
  // Format price with appropriate currency
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(dish.price);
  
  // Get appropriate tag icon
  const getTagIcon = (tag) => {
    switch(tag) {
      case 'popular':
        return <ThumbsUp size={14} className="mr-1" />;
      case 'chef\'s special':
        return <ChefHat size={14} className="mr-1" />;
      case 'hot':
        return <Flame size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader 
        className="pb-1 pt-2 px-3 active:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            <span title={dish.veg ? "Vegetarian" : "Non-Vegetarian"}>
              {dish.veg ? <VegIcon /> : <NonVegIcon />}
            </span>
            <CardTitle className="text-base font-semibold">
              {dish.name}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <div className="px-2 py-0.5 bg-amber-100 rounded-full text-amber-800 font-bold text-xs">
              {formattedPrice}
            </div>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-1">
          {dish.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="flex items-center px-1.5 py-0 bg-gray-100 text-gray-800 text-xs" 
            >
              {getTagIcon(tag)}
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <>
                  <Separator />
          <CardContent className="py-2 px-3">
            <CardDescription className="mb-2 text-gray-600 text-sm">{dish.description}</CardDescription>
            
            {dish.spice_level > 0 && (
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-700 mb-0.5 block">Spice Level</span>
                {renderSpiceLevel(dish.spice_level)}
              </div>
            )}
            
            <div className="flex items-center text-xs text-gray-600">
              <Clock size={12} className="mr-1" />
              <span className="font-medium">Prep Time:</span>
              <span className="ml-1">{dish.preparation_time} mins</span>
            </div>
          </CardContent>
          
          <Separator />
          
          <CardFooter className="py-2 px-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Ingredients</h4>
              <p className="text-xs capitalize text-gray-700">
                {dish.ingredients.join(', ')}
              </p>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}