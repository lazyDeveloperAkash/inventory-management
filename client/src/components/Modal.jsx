
import { X } from "lucide-react"

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  )
}
