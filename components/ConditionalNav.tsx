'use client';

import { usePathname } from 'next/navigation';
import { NavigationBar } from './NavigationBar';

export function ConditionalNav() {
  const pathname = usePathname();
  
  // Hide navigation on dashboard and login pages
  const hiddenPaths = ['/dashboard', '/login'];
  const shouldHide = hiddenPaths.some(path => pathname.startsWith(path));

  if (shouldHide) {
    return null;
  }

  return <NavigationBar />;
}
