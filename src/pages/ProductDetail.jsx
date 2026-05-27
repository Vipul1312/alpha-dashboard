import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";
import { ArrowLeft, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../components/common/Loader";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setActiveImage(0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 mb-4"
      >
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="bg-white border border-slate-200 rounded-xl p-5 lg:p-8 grid lg:grid-cols-2 gap-8">
        
        <div>
          <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="w-full h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1))
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() =>
                    setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                    activeImage === i ? "border-indigo-500" : "border-slate-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="inline-block text-xs text-indigo-600 font-semibold uppercase tracking-wide mb-2 bg-indigo-50 px-2 py-1 rounded capitalize">
            {product.category?.replace(/-/g, " ")}
          </span>

          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
            {product.title}
          </h1>

          <p className="text-sm text-slate-500 mt-1">Brand: {product.brand || "—"}</p>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
            <span className="text-sm text-slate-500">• {product.stock} in stock</span>
          </div>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-800">${product.price}</span>
            {product.discountPercentage && (
              <span className="text-sm text-green-600 font-medium">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
