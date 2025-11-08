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

  // Make navbar absolute on homepage
  const isHomepage = pathname === '/';

  return (
    <div className={isHomepage ? 'absolute top-0 left-0 right-0 z-50' : ''}>
      <NavigationBar isHomepage={isHomepage} />
    </div>
  );
}
