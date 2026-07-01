"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import Sidebar from "@/compoenents/sidebar/sidebar";
import Header from "@/compoenents/Header/Navpanel";
import AdminLogin from "@/compoenents/auth/login";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { getPageTitle } from "@/utils/dynamic_pagetitle/page-title";
import { useLocalStorage } from "@/compoenents/sidebar/sidehook";
import VisitorInitializer from "@/compoenents/VisitorInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
const [collapsed, setCollapsed] =
  useLocalStorage("sidebar-collapsed", false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsAuthenticated(!!token);
  }, []);

  const user = {
    name: "Shivam Dubey",
    email: "shivam.dubey@gmail.com",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHtg-9JlYIHtg/profile-displayphoto-shrink_200_200/B4DZQ3SP4WGgAc-/0/1736094318889?e=2147483647&v=beta&t=uxcOi4Zl1DdmnKY3uY4X9gQsYeDl0FGM69Ns5waaDAE",
  };

  // Loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-gray-500">Loading...</div>
          </div>
        </body>
      </html>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <html lang="en">
        <body>
          <AdminLogin />
        </body>
      </html>
    );
  }

  // Logged in
  return (
    <html lang="en">
      <head>   <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white`}
      >
       <VisitorInitializer />
  {children}
        <div className="flex min-h-screen bg-white">
          <Sidebar
            user={user}
            open={open}
            setOpen={setOpen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

<div
  className={`flex-1 flex flex-col min-w-0 bg-white transition-all duration-300
  ${collapsed ? "md:ml-20" : "md:ml-64"}`}
>            <div className="flex items-center p-4 border-b md:hidden bg-white sticky top-0 z-30">
              <button
                onClick={() => setOpen(true)}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open Menu"
              >
                <Menu size={15} className="text-black" />
              </button>
            </div>

            <Header
              ishome={pathname === "/"}
              name={user.name}
              title={getPageTitle(pathname)}
            />

<main className="flex-1 bg-gray-50/50 overflow-y-auto overflow-x-hidden">
              <div className="p-4 md:p-6 lg:p-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}