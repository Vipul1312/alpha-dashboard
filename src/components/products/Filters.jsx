import { memo } from "react";

const Filters = memo(function Filters({
  categories,
  selectedCategories,
  onToggleCategory,
  sortBy,
  onSortChange,
  minRating,
  onRatingChange,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-700 uppercase">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700 uppercase">Min Rating</label>
        <select
          value={minRating}
          onChange={(e) => onRatingChange(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="0">All</option>
          <option value="3">3+ ⭐</option>
          <option value="4">4+ ⭐</option>
          <option value="4.5">4.5+ ⭐</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700 uppercase mb-2 block">
          Categories ({selectedCategories.length})
        </label>
        <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer text-sm capitalize"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-slate-700">{cat.replace(/-/g, " ")}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Filters;
