import { ReactNode } from 'react';
import { requireAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default async function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    await requireAuth();
  } catch {
    redirect('/login');
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
