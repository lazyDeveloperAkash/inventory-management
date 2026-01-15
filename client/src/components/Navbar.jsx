
import { Menu } from "lucide-react"

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        <div className="flex-1 flex items-center justify-between md:justify-end">
          <div className="text-lg font-semibold text-gray-900 md:hidden">Inventory</div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline">Welcome back</span>
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">IN</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
