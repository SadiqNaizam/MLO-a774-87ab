import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    // The root container, ensuring it spans at least the full viewport height.
    <div className={cn("min-h-screen", className)}>
      {/* 
        The Sidebar component renders SidebarNav, which is `fixed` and thus
        taken out of the normal document flow. It will overlay content unless
        the subsequent content is offset.
      */}
      <Sidebar />
      
      {/* 
        This div contains the Header and the main content area (children).
        - `ml-64`: This margin creates space on the left for the fixed Sidebar (width w-64).
        - `flex flex-col`: Arranges Header and main content vertically.
        - `h-screen`: Makes this column occupy the full viewport height. This ensures that
          the `main` area can use `flex-1` to fill space correctly down to the bottom
          of the screen, and `overflow-y-auto` will work within this fixed-height column.
      */}
      <div className="ml-64 flex flex-col h-screen">
        {/* 
          The Header component renders TopHeader, which is `sticky top-0` and `h-16`.
          It will stick to the top of this `div.ml-64` container when the `main` area scrolls.
        */}
        <Header />
        
        {/* 
          The main content area where page-specific components are rendered.
          - `flex-1`: Allows this area to expand and take up remaining vertical space
            in the `flex-col` parent, below the Header.
          - `overflow-y-auto`: Enables vertical scrolling if content exceeds available height.
          - `p-6`: Standard padding around the content (24px).
          - `bg-background`: Sets the background color, consistent with `body` style.
        */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
