// src/app/(main)/posts/[postId]/layout.tsx

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <header>
        <h1>Post Page</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;