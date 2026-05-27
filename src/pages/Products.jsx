import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../api/products";
import { useAuthStore } from "../store/authStore";
import { useProductStore } from "../store/productStore";
import useDebounce from "../hooks/useDebounce";
import ProductCard from "../components/products/ProductCard";
import Filters from "../components/products/Filters";
import SearchBar from "../components/common/SearchBar";
import Pagination from "../components/products/Pagination";
import Loader from "../components/common/Loader";
import { SlidersHorizontal } from "lucide-react";

const PAGE_SIZE = 12;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();
  const { hiddenProducts } = useProductStore();
  const isAdmin = user?.role === "admin";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const search = searchParams.get("search") || "";
  const selectedCategories = searchParams.get("category")
    ? searchParams.get("category").split(",")
    : [];
  const sortBy = searchParams.get("sort") || "";
  const minRating = searchParams.get("rating") || "0";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const debouncedSearch = useDebounce(search, 400);

  const updateParams = useCallback(
    (updates) => {
      const next = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === "" || value === null || value === undefined || value === "0") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [productData, catData] = await Promise.all([
          fetchProducts(100, 0),
          fetchCategories(),
        ]);
        setProducts(productData.products);
        setCategories(catData);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  
  const toggleCategory = useCallback(
    (cat) => {
      const next = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat];
      updateParams({ category: next.join(","), page: "1" });
    },
    [selectedCategories, updateParams]
  );

  const filtered = useMemo(() => {
    let list = [...products];

    if (!isAdmin) {
      list = list.filter((p) => !hiddenProducts.includes(p.id));
    }

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    if (parseFloat(minRating) > 0) {
      list = list.filter((p) => p.rating >= parseFloat(minRating));
    }

    
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return list;
  }, [products, debouncedSearch, selectedCategories, sortBy, minRating, isAdmin, hiddenProducts]);

  
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Products</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filtered.length} products found
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <SearchBar
          value={search}
          onChange={(v) => updateParams({ search: v, page: "1" })}
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
       
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <Filters
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            sortBy={sortBy}
            onSortChange={(v) => updateParams({ sort: v, page: "1" })}
            minRating={minRating}
            onRatingChange={(v) => updateParams({ rating: v, page: "1" })}
          />
        </div>

        <div>
          {paginated.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              <div className="text-4xl mb-2">😕</div>
              No products match your filters
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => updateParams({ page: String(p) })}
          />
        </div>
      </div>
    </div>
  );
}
