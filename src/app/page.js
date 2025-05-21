'use client'
import { useState, useEffect } from "react";
// Remove the direct import of menuData
import { SearchBar } from "@/components/menu/SearchBar";
import { FilterSection } from "@/components/menu/FilterSection";
import { DishCard } from "@/components/menu/DishCard";

// Add import for DarkModeToggle
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { AppHeader } from "@/components/AppHeader";

export default function RestaurantMenu() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [vegFilter, setVegFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Detect system preference and apply dark mode
  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkQuery.matches);
    if (darkQuery.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const handler = (e) => {
      setIsDark(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    darkQuery.addEventListener('change', handler);
    return () => darkQuery.removeEventListener('change', handler);
  }, []);

  // Toggle dark mode manually
  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Fetch menu data
  useEffect(() => {
    fetch('/dishes.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setFilteredDishes(data.menu.dishes);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading menu data:', error);
        setIsLoading(false);
      });
  }, []);

  // Apply all filters to dishes
  useEffect(() => {
    if (!menuData) return;

    let result = menuData.menu.dishes;

    // Filter by active category if not viewing all categories
    if (activeCategory !== 0) {
      result = result.filter(dish => dish.category_id === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(dish =>
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.ingredients.some(ing => ing.toLowerCase().includes(query))
      );
    }

    // Filter by veg/non-veg preference
    if (vegFilter === "veg") {
      result = result.filter(dish => dish.veg);
    } else if (vegFilter === "nonveg") {
      result = result.filter(dish => !dish.veg);
    }

    // Apply sorting
    if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    setFilteredDishes(result);
  }, [activeCategory, searchQuery, vegFilter, sortBy, menuData]);

  // Group dishes by category
  const groupedDishes = () => {
    return filteredDishes.reduce((acc, dish) => {
      const categoryId = dish.category_id;
      if (!acc[categoryId]) acc[categoryId] = [];
      acc[categoryId].push(dish);
      return acc;
    }, {});
  };

  // Reset all filters to default values
  const resetFilters = () => {
    setActiveCategory(0);
    setVegFilter("all");
    setSearchQuery("");
    setSortBy("default");
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-center min-h-[200px] bg-white dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-300">Loading menu...</div>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-center min-h-[200px] bg-white dark:bg-gray-900">
        <div className="text-red-500 dark:text-red-400">Failed to load menu data</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <AppHeader isDark={isDark} toggleDark={toggleDark} />
      {/* <DarkModeToggle  /> */}

      <div className="mb-3">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {showFilters && (
          <FilterSection
            vegFilter={vegFilter}
            onVegFilterChange={setVegFilter}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={menuData.menu.categories}
            onReset={resetFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        )}
      </div>

      <div className="mb-6">

        {filteredDishes.length === 0 ? (
          <div className="py-8 text-center text-gray-500 dark:text-gray-300">
            <p>No dishes match your search criteria.</p>
            <p className="text-sm mt-2">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedDishes()).map(([categoryId, dishes]) => (
              <div key={categoryId} className="space-y-4">
                {
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                    {menuData.menu.categories.find(c => c.id === Number(categoryId))?.name}
                  </h3>
                }
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                  {dishes.map((dish) => (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Please inform your server of any allergies or dietary restrictions.</p>
      </div>
    </div>
  );
}