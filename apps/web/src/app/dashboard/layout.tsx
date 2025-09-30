import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import type { ReactNode } from 'react';

export default async function DashboardSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }

  return <>{children}</>;
}
