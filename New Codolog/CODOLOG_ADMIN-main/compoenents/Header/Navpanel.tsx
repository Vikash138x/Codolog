"use client";

import { useEffect, useState } from "react";
import LogoutButton from "../logout/logoutt";

interface HeaderProps {
  name?: string;
  title?: string;
  ishome: boolean;
}

export default function Header({
  name = "",
  title = "",
  ishome,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white border-b border-gray-200 transition-all duration-300 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="px-6 flex items-center justify-between">
        <div>
          <h1
            className={`font-bold text-gray-900 transition-all duration-300 ${
              scrolled ? "text-lg" : "text-2xl"
            }`}
          >
            {ishome ? `Welcome Back, ${name} 👋` : title}
          </h1>

          {!scrolled && (
            <p className="text-sm text-gray-500 mt-1">
              {ishome
                ? "Manage your platform efficiently from the dashboard."
                : `Manage and update ${title.toLowerCase()} details.`}
            </p>
          )}
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}