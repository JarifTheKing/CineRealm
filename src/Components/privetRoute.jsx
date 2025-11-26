"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="w-full flex justify-center py-10">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  return children;
}
