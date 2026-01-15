
import { Link, useLocation } from "react-router-dom"
import { BarChart3, Package, TrendingUp } from "lucide-react"

export default function Sidebar({ open, setOpen }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { label: "Dashboard", path: "/", icon: BarChart3 },
    { label: "Products", path: "/products", icon: Package },
    { label: "Reports", path: "/reports", icon: TrendingUp },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 md:hidden z-40" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-white border-r border-gray-200 transform transition-transform md:translate-x-0 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">InvMgr</h1>
          <p className="text-xs text-gray-500 mt-1">Inventory System</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
