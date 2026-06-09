import { getCurrentUser } from '@/lib/get-current-user'
import AdminDashboardClient from '@/components/admin-dashboard-client'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const user = await getCurrentUser()

  const isAdmin = Boolean(
    user?.role === 'admin' ||
      (process.env.ALLOW_MOCK_PI === '1' && String(user?.username || '').toLowerCase() === 'admin')
  )

  if (!user) return redirect('/')
  if (!isAdmin) return redirect('/forbidden')

  return <AdminDashboardClient user={user} />
}
