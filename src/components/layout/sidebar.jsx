import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, BarChart3, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function Sidebar({ open, onClose }) {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const menu = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      adminOnly: true,
    },
    { to: "/products", label: "Products", icon: Package, adminOnly: false },
    { to: "/analytics", label: "Analytics", icon: BarChart3, adminOnly: true },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-40 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                α
              </div>
              <span className="font-bold text-lg text-slate-800">Alpha</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-500">
              <X size={20} />
            </button>
          </div>

          {/* Menu */}
          <nav className="p-3 space-y-1 flex-1">
            {menu
              .filter((item) => !item.adminOnly || isAdmin)
              .map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">Logged in as</div>
            <div className="text-sm font-semibold text-slate-800 capitalize">
              {user?.role}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
