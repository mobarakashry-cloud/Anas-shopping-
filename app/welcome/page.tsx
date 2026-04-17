"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag, Shield, Sparkles, Globe } from 'lucide-react'
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="bg-teal-600 p-6 rounded-3xl shadow-2xl">
            <ShoppingBag className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* Arabic Welcome Message */}
        <div className="space-y-4" dir="rtl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-balance">
            مرحبًا بك في Anas Shopping!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-pretty">
            اكتشف منتجاتنا بسهولة وأمان.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 py-6">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full">
              <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">آمن</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">ذكي</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full">
              <Globe className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">عالمي</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-3 pt-4">
          <Link href="/" className="block">
            <Button 
              size="lg" 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              ابدأ التسوق الآن
            </Button>
          </Link>
          <Link href="/sell" className="block">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full"
            >
              بيع منتجاتك
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 dark:text-gray-400 pt-4">
          منتجات جديدة • مستعملة • يدوية
        </p>
      </div>
    </div>
  )
}
