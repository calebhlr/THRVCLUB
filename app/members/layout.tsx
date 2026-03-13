import React from 'react';
import { MembersHeader } from '@/components/members';

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col font-sans">
      <MembersHeader />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
