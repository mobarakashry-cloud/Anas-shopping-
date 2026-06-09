import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-lg p-8 bg-card rounded-lg text-center border">
        <h1 className="text-4xl font-bold">403</h1>
        <p className="mt-4 text-lg">Access Denied — you do not have permission to view this page.</p>
        <div className="mt-6">
          <Link href="/">
            <a className="inline-block px-4 py-2 rounded bg-primary text-primary-foreground">Go to Home</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
