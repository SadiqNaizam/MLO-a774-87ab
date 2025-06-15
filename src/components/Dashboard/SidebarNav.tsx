import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutGrid, Users, UserCircle, FileText, Receipt, ShoppingCart, Mail, Archive, CalendarDays, HelpCircle, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isBeta?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive }) => {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center px-3 py-2 text-sm font-medium rounded-md',
        isActive
          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'transition-colors duration-150 ease-in-out group'
      )}
    >
      <Icon className={cn('mr-3 h-5 w-5', isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground')} />
      {label}
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const mainNavItems: NavItemProps[] = [
  { href: '#', icon: LayoutGrid, label: 'Dashboard', isActive: true },
  { href: '#', icon: Users, label: 'Leads' },
  { href: '#', icon: UserCircle, label: 'Customers' },
  { href: '#', icon: FileText, label: 'Proposals' },
  { href: '#', icon: Receipt, label: 'Invoices' },
  { href: '#', icon: ShoppingCart, label: 'Items' },
  { href: '#', icon: Mail, label: 'Mail' },
  { href: '#', icon: Archive, label: 'Shoebox' },
  { href: '#', icon: CalendarDays, label: 'Calendar' },
];

const secondaryNavItems: NavItemProps[] = [
  { href: '#', icon: HelpCircle, label: 'Help' },
  { href: '#', icon: Settings, label: 'Settings' },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  return (
    <aside className={cn('w-64 bg-sidebar text-sidebar-foreground p-4 flex flex-col space-y-4 fixed h-full', className)}>
      <div className="flex items-center justify-between h-16 pr-2"> {/* Adjusted for header height alignment */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
            B
          </div>
          <span className="font-semibold text-xl text-foreground">bo</span>
        </div>
        {/* Placeholder for menu icon if needed for mobile, not shown in desktop image */}
        {/* <Button variant="ghost" size="icon" className="md:hidden"> <Menu /> </Button> */}
      </div>
      
      <nav className="flex-grow space-y-1">
        {mainNavItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="space-y-1 pt-4 border-t border-sidebar-border">
        {secondaryNavItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </aside>
  );
};

export default SidebarNav;
