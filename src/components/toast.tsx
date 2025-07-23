"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error"
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
    }
  }, [isVisible, onClose])

  if (!isVisible && !isAnimating) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm ${
          type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 flex-shrink-0" />
        )}
        <p className="text-sm font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
