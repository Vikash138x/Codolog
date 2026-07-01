"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const alertStyle = {
  background: "#ffffff",
  color: "#111",
  confirmButtonColor: "#111",
  denyButtonColor: "#e5e5e5",
  customClass: {
    popup: "!rounded-2xl",
    confirmButton: "!rounded-xl !px-6 !py-2.5 !font-medium",
    denyButton: "!rounded-xl !px-6 !py-2.5 !font-medium !text-stone-800",
  },
};

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out?",
      text: "You'll need to sign in again to access the dashboard.",
      icon: "question",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Yes, log out",
      denyButtonText: "Cancel",
      ...alertStyle,
    });

    if (!result.isConfirmed) return;

    // Clear everything
    localStorage.clear();
    sessionStorage.clear();

    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    router.replace("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-stone-600 border border-stone-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Log out
    </button>
  );
}