import React from 'react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/get-current-user'

export default async function HeaderServer() {
  const user = await getCurrentUser()

  return (
    <header dir="rtl" className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-amber-400 text-amber-50 font-bold text-lg">
                أنس
              </div>
              <span className="hidden sm:inline-block font-bold text-lg text-purple-600">تسوق أنس</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/cart">
              <a className="inline-flex items-center px-2 py-1 rounded hover:bg-muted">
                سلة التسوق
              </a>
            </Link>
            {user ? (
              <div className="inline-flex items-center gap-2">
                <span className="text-sm">{user.username || user.id}</span>
                <Link href="/profile">
                  <a className="inline-flex items-center px-2 py-1 rounded hover:bg-muted">الملف</a>
                </Link>
              </div>
            ) : (
              <Link href="/profile">
                <a className="inline-flex items-center px-2 py-1 rounded hover:bg-muted">تسجيل الدخول</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
