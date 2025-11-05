import { requireAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  try {
    const user = await requireAuth();

    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <form action="/api/logout" method="POST">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-8">
              <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard!</h2>
              <p className="text-gray-600">You are logged in as: <strong>{user.email}</strong></p>
              <p className="text-gray-600 mt-2">User ID: {user.id}</p>
            </div>
          </div>
        </main>
      </div>
    );
  } catch {
    redirect('/login');
  }
}
