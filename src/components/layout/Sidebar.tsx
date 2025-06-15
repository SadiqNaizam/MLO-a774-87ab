import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav from context is already styled and positioned:
  // - fixed: Takes it out of normal flow.
  // - h-full: Occupies full viewport height.
  // - w-64: Sets its width.
  // - bg-sidebar: Sets its background color.
  // This Sidebar component primarily serves as a structural element in the layout system,
  // delegating the actual sidebar rendering and logic to SidebarNav.
  return <SidebarNav className={cn(className)} />;
};

export default Sidebar;
