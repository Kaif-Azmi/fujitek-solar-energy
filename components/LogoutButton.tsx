"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui";
import * as React from "react";

export default function LogoutButton() {
  return (
    <Button
      variant="destructive"
      className="w-full justify-start"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      Sign out
    </Button>
  );
}
