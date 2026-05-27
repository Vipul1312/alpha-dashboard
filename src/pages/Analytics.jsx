import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/products";
import StatCard from "../components/analytics/StatCard";
import CategoryChart from "../components/analytics/CategoryChart";
import Loader from "../components/common/Loader";
import { Package, Star, DollarSign, Layers } from "lucide-react";

export default function Analytics() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(100, 0)
      .then((d) => setProducts(d.products))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    if (!products.length) return null;

    const totalProducts = products.length;
    const avgRating = (
      products.reduce((sum, p) => sum + p.rating, 0) / totalProducts
    ).toFixed(2);
    const inventoryValue = products
      .reduce((sum, p) => sum + p.price * p.stock, 0)
      .toFixed(2);

    // Category distribution
    const catMap = {};
    products.forEach((p) => {
      catMap[p.category] = (catMap[p.category] || 0) + 1;
    });
    const categoryData = Object.entries(catMap).map(([name, value]) => ({
      name: name.replace(/-/g, " "),
      value,
    }));

    return { totalProducts, avgRating, inventoryValue, categoryData };
  }, [products]);

  if (loading) return <Loader />;
  if (!stats) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Analytics</h1>
      <p className="text-sm text-slate-500 mb-6">Overview of your store performance</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Package} label="Total Products" value={stats.totalProducts} color="indigo" />
        <StatCard icon={Star} label="Avg Rating" value={`${stats.avgRating} ⭐`} color="yellow" />
        <StatCard
          icon={DollarSign}
          label="Inventory Value"
          value={`$${Number(stats.inventoryValue).toLocaleString()}`}
          color="green"
        />
        <StatCard icon={Layers} label="Categories" value={stats.categoryData.length} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryChart data={stats.categoryData} />

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Top Rated Products</h3>
          <div className="space-y-3">
            {[...products]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 5)
              .map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-800 truncate">
                      {p.title}
                    </div>
                    <div className="text-xs text-slate-500 capitalize">{p.category}</div>
                  </div>
                  <div className="text-sm font-semibold text-yellow-600">
                    {p.rating} ⭐
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
