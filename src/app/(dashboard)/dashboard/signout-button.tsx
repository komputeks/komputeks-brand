'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10">
      <LogOut className="h-4 w-4" /> Sign Out
    </button>
  );
}
