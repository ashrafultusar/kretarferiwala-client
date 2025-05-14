"use client";

import {  usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  Upload,
  ShoppingBag,
  Layers,
  HomeIcon
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const pathname = usePathname(); 
  const [showSidebar, setShowSidebar] = useState(false);

  

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: ShoppingBag,
    },
    {
      href: "/admin/allProducts",
      label: "Products",
      icon: Package,
    },
    {
      href: "/admin/products",
      label: "Upload Product",
      icon: Upload,
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: Layers,
    },
    {
      href: "/admin/slider",
      label: "Home Slider",
      icon: HomeIcon,
    },
    {
      href: "/admin/deliveryform",
      label: "Delivery Charge",
      icon: HomeIcon,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          showSidebar ? "block" : "hidden"
        } md:block w-64 bg-[#0f766e] text-white shadow-lg z-30 md:relative fixed h-full`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          OrderEmpire
        </div>
        <nav className="flex flex-col gap-2 p-4 text-sm">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded hover:bg-[#115e59] transition-all cursor-pointer",
                pathname === href && "bg-[#134e4a] font-semibold"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          <button
            
            className="mt-6 w-full py-2 bg-[#134e4a] hover:bg-red-700 text-white rounded text-center transition-all cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-40">
        <h1 className="text-xl font-bold text-orange-500">Admin</h1>
        <button onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-16 md:mt-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}


