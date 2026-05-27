import { Menu, LogOut, User } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-lg"
      >
        <Menu size={22} />
      </button>

      <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">
        Welcome back, <span className="text-indigo-600 capitalize">{user?.username}</span> 👋
      </h1>

      {/* User Profile Section */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-lg"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-semibold text-slate-800">{user?.username}</div>
            <div className="text-xs text-slate-500 capitalize">{user?.role}</div>
          </div>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30">
            <div className="px-4 py-2 border-b border-slate-100">
              <div className="text-sm font-medium text-slate-800">{user?.username}</div>
              <div className="text-xs text-slate-500 capitalize">{user?.role} account</div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
