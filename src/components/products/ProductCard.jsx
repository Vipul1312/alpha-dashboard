import { memo } from "react";
import { Link } from "react-router-dom";
import { Star, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useProductStore } from "../../store/productStore";

const ProductCard = memo(function ProductCard({ product }) {
  const { user } = useAuthStore();
  const { hiddenProducts, toggleProductVisibility } = useProductStore();
  const isAdmin = user?.role === "admin";
  const isHidden = hiddenProducts.includes(product.id);

  const stockStatus =
    product.stock > 20
      ? { label: "In Stock", color: "bg-green-100 text-green-700" }
      : product.stock > 0
      ? { label: "Low Stock", color: "bg-yellow-100 text-yellow-700" }
      : { label: "Out of Stock", color: "bg-red-100 text-red-700" };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition group relative">
      {isAdmin && isHidden && (
        <div className="absolute top-2 left-2 bg-slate-800 text-white text-xs px-2 py-1 rounded z-10">
          Hidden
        </div>
      )}

      <Link to={`/products/${product.id}`}>
        <div className="aspect-square bg-slate-100 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1 capitalize">
          {product.category?.replace(/-/g, " ")}
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 hover:text-indigo-600 min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-slate-600">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-800">${product.price}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${stockStatus.color}`}>
            {stockStatus.label}
          </span>
        </div>

        {isAdmin && (
          <button
            onClick={() => toggleProductVisibility(product.id)}
            className={`mt-3 w-full flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition ${
              isHidden
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
            {isHidden ? "Publish" : "Hide"}
          </button>
        )}
      </div>
    </div>
  );
});

export default ProductCard;
