'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function ConditionalMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Don't wrap dashboard and login pages with padding
  const noPaddingPaths = ['/dashboard', '/login'];
  const shouldRemovePadding = noPaddingPaths.some(path => pathname.startsWith(path));

  if (shouldRemovePadding) {
    return <>{children}</>;
  }

  return (
    <main className="px-8 py-4 lg:px-24 w-full">
      {children}
    </main>
  );
}
