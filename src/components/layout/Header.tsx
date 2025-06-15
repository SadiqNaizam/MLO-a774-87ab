import React from 'react';
import TopHeader from '../Dashboard/TopHeader';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // TopHeader from context is already styled and positioned:
  // - sticky top-0: Sticks to the top of its scrollable container.
  // - h-16: Sets its height.
  // - bg-background: Sets its background color.
  // - w-full: Takes the full width of its parent container.
  // This Header component serves as a structural element, wrapping TopHeader.
  return <TopHeader className={cn(className)} />;
};

export default Header;
