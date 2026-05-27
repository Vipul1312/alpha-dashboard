import { Link } from "react-router-dom";
import { Package, BarChart3, ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 lg:p-8 text-white mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Good to see you, {user?.username} 👋
        </h1>
        <p className="text-indigo-100 mt-2">
          Here's a quick overview of your Alpha admin panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/products"
          className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition group"
        >
          <Package className="text-indigo-600 mb-3" size={32} />
          <h3 className="font-semibold text-slate-800 text-lg">Manage Products</h3>
          <p className="text-sm text-slate-500 mt-1">
            View all products, edit visibility, and control inventory
          </p>
          <div className="mt-3 flex items-center gap-1 text-sm text-indigo-600 font-medium">
            Go to Products <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
          </div>
        </Link>

        <Link
          to="/analytics"
          className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition group"
        >
          <BarChart3 className="text-purple-600 mb-3" size={32} />
          <h3 className="font-semibold text-slate-800 text-lg">View Analytics</h3>
          <p className="text-sm text-slate-500 mt-1">
            Check store performance, ratings, and category insights
          </p>
          <div className="mt-3 flex items-center gap-1 text-sm text-indigo-600 font-medium">
            Go to Analytics <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
          </div>
        </Link>
      </div>
    </div>
  );
}
