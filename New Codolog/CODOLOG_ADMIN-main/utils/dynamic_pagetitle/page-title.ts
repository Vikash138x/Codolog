// utils/page-title.ts

export const getPageTitle = (pathname: string) => {
  if (pathname === "/") return "Dashboard";

  if (pathname.startsWith("/pages/Course_Home"))
    return "Course Panel";

  if (pathname.startsWith("/pages/Edit_Course"))
    return "Edit Course";

  if (pathname.startsWith("/pages/tutor"))
    return "Manage Tutor";

  if (pathname.startsWith("/pages/users"))
    return "Manage Users";

  return "Dashboard";
};