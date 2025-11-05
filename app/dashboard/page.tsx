import { requireAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  try {
    const user = await requireAuth();

    return (
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">مرحباً بك في لوحة التحكم</h2>
          <p className="text-gray-600">تم تسجيل الدخول بواسطة: <strong>{user.email}</strong></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/dashboard/news"
            className="block p-6 bg-white/50 backdrop-blur rounded-lg shadow hover:shadow-lg transition-shadow border border-primary/20"
          >
            <h3 className="text-xl font-bold text-primary mb-2">إدارة الأخبار</h3>
            <p className="text-gray-600">إضافة وتعديل وحذف الأخبار</p>
          </a>
        </div>
      </div>
    );
  } catch {
    redirect('/login');
  }
}
