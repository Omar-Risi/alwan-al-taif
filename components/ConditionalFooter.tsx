'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on dashboard and login pages
  const hiddenPaths = ['/dashboard', '/login'];
  const shouldHide = hiddenPaths.some(path => pathname.startsWith(path));

  if (shouldHide) {
    return null;
  }

  return <Footer />;
}
