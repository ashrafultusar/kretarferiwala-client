
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminNav from './AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login"); 
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router,pathname]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  if (!authenticated) return null;

  return <AdminNav>{children}</AdminNav>;
}
