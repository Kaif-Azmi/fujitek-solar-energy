"use client";

import { signOut } from 'next-auth/react';
import * as React from 'react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-blue-50"
    >
      Sign out
    </button>
  );
}
