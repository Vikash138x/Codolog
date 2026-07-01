"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  LayoutGrid,
  BookOpen,
  Presentation,
  User,
  Video,
  X,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

type UserType = {
  name: string;
  email: string;
  image?: string;
};

const navItems = [
  { icon: Home, label: "Home", href: "/pages/Dashboard" },
  { icon: LayoutGrid, label: "Dashboard", href: "/pages/dashboard" },
  { icon: BookOpen, label: "Course", href: "/pages/Course_Home" },
  { icon: Presentation, label: "Tutor", href: "/pages/tutors" },
  { icon: Video, label: "Webinars", href: "/pages/webinars",},
  { icon: User, label: "Users", href: "/pages/users",},
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function Sidebar({
  user,
  open,
  setOpen,
  collapsed,
  setCollapsed,
}: {
  user: UserType;
  open: boolean;
  setOpen: (val: boolean) => void;
  collapsed?: boolean;
  setCollapsed?: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
<aside
  className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 flex flex-col
  transform transition-all duration-300 ease-in-out
  ${collapsed ? "w-20" : "w-64"}
  ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
>
        
        {/* Logo Section using your uploaded image */}
        <div className={`px-5 py-6 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 shrink-0 ">
                <Image 
                  src="/logo.png" // Replace with your actual file path in /public
                  alt="Codolog Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl text-black font-bold leading-tight">Codolog</h1>
                <p className="text-[10px] text-gray-500 font-medium tracking-wide">Always learn Unique</p>
              </div>
            </div>
          )}

          {!collapsed && (
            <button 
              className="md:block hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setCollapsed?.(!collapsed)}
              title="Collapse sidebar"
            >
              <PanelLeftClose size={30} className="text-black" />
            </button>
          )}
          
          {collapsed && (
            <button 
              className="md:block hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setCollapsed?.(!collapsed)}
              title="Expand sidebar"
            >
              <PanelLeftOpen size={30} className="text-black" />
            </button>
          )}

          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/*Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = isActive(href);

            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${active ? "bg-black text-white shadow-md" : "text-gray-600 hover:bg-gray-50"}`}
                title={collapsed ? label : ""}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                  {!collapsed && <span>{label}</span>}
                </div>
                
                {/* Visual accents from your dashboard screenshot */}
                {!collapsed && active && <ChevronRight size={14} className="opacity-80" />}
               
              </Link>
            );
          })}
        </nav>

        {/* User Profile (At Bottom) */}
        <div className={`mt-auto px-4 py-4 border-t border-gray-200 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
          {user.image ? (
            <div className="relative w-10 h-10">
              <img src={user.image} alt="user"  className="rounded-full border object-cover" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs border border-slate-200">
              {getInitials(user.name)}
            </div>
          )}
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm text-black font-bold truncate leading-none mb-1">{user.name}</p>
              <p className="text-[11px] text-gray-400 truncate font-medium">{user.email}</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}



