import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// Root admin layout: no protection here; (protected) group has its own layout
export default function AdminLayout({ children }: Props) {
  return <>{children}</>;
}
