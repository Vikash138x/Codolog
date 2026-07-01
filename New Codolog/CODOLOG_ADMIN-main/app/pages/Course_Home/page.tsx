"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Link, Plus } from "lucide-react";
import AddCoursePage from "@/compoenents/create_course/page";
import AddCategoryPage from "@/compoenents/Add_Category/AddCategory";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Course {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  totalPrice: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockCourses: Course[] = [
  { id: 1, name: "React Fundamentals", category: "Web Development", price: 2999, discount: 10, totalPrice: 2699 },
  { id: 2, name: "Next.js Mastery", category: "Web Development", price: 3999, discount: 15, totalPrice: 3399 },
  { id: 3, name: "UI/UX Design Basics", category: "Design", price: 1999, discount: 0, totalPrice: 1999 },
  { id: 4, name: "Node.js Backend", category: "Backend", price: 3499, discount: 20, totalPrice: 2799 },
  { id: 5, name: "TypeScript Deep Dive", category: "Web Development", price: 2499, discount: 5, totalPrice: 2374 },
  { id: 6, name: "MongoDB Essentials", category: "Database", price: 1799, discount: 10, totalPrice: 1619 },
  { id: 7, name: "Docker & DevOps", category: "DevOps", price: 4299, discount: 25, totalPrice: 3224 },
  { id: 8, name: "Python for Data Science", category: "Data Science", price: 3799, discount: 0, totalPrice: 3799 },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const CourseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const TutorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ViewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// ─── Sidebar ──────────────────────────────────────────────────────────────────
// function Sidebar() {
//   const [activeNav, setActiveNav] = useState("course");

//   const navItems = [
//     { id: "home", label: "Home", icon: <HomeIcon /> },
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "course", label: "Course", icon: <CourseIcon />, hasArrow: true },
//     { id: "tutor", label: "Tutor", icon: <TutorIcon /> },
//     { id: "users", label: "Users", icon: <UsersIcon />, badge: 4 },
//   ];

//   return (
//     <aside className="w-[200px] min-w-[200px] bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen overflow-y-auto">
//       {/* Logo */}
//       <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-100">
//         <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 overflow-hidden">
//           <Image
//             src="/logo.png"
//             alt="Codolog Logo"
//             width={36}
//             height={36}
//             className="object-cover w-full h-full"
//           />
//         </div>
//         <div>
//           <p className="text-sm font-bold text-gray-900 leading-tight">Codolog</p>
//           <p className="text-[9px] text-gray-400 leading-tight">Always learn Unique</p>
//         </div>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-col gap-0.5 px-2 py-3 flex-1">
//         {navItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => setActiveNav(item.id)}
//             className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg w-full text-left text-[13px] font-medium transition-colors duration-150 ${
//               activeNav === item.id
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-500 hover:bg-gray-50"
//             }`}
//           >
//             <span className={`flex flex-shrink-0 ${activeNav === item.id ? "text-white" : "text-gray-400"}`}>
//               {item.icon}
//             </span>
//             <span className="flex-1">{item.label}</span>
//             {item.badge && (
//               <span className="bg-gray-200 text-gray-600 text-[10px] font-bold rounded-full px-1.5 py-px min-w-[18px] text-center">
//                 {item.badge}
//               </span>
//             )}
//             {item.hasArrow && activeNav === item.id && (
//               <span className="text-white flex"><ChevronRight /></span>
//             )}
//           </button>
//         ))}
//       </nav>

//       {/* User */}
//       <div className="flex items-center gap-2.5 px-4 py-4 border-t border-gray-100">
//         <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
//           <span className="text-[13px] font-bold text-gray-600">S</span>
//         </div>
//         <div className="overflow-hidden">
//           <p className="text-xs font-semibold text-gray-900 leading-tight truncate">Shivam Dubey</p>
//           <p className="text-[10px] text-gray-400 leading-tight truncate">shivam.dubey@gmail.com</p>
//         </div>
//       </div>
//     </aside>
//   );
// }

// ─── Top Action Panel ─────────────────────────────────────────────────────────
function TopActionPanel({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) {
  const tabs = ["Home", "Add Course", "Add Category", "Draft Course"];

  return (
    <div className="flex gap-3 px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2 px-4 rounded-lg text-[13px] font-semibold border transition-all duration-150 whitespace-nowrap ${activeTab === tab
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── Courses Table ────────────────────────────────────────────────────────────
// ✅ courses prop accept kar raha hai ab
function CoursesTable({ courses }: { courses: Course[] }) {
  const router = useRouter();
  const columns = ["Course Name", "Category", "Price", "Discount", "Total Price", "Action"];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((course, i) => (
            <tr
              key={course.id}
              className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors duration-100`}
            >
              <td className="px-4 py-3 text-gray-700 border-b border-gray-50">{course.name}</td>
              <td className="px-4 py-3 border-b border-gray-50">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold">
                  {course.category}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-700 border-b border-gray-50">₹{course.price.toLocaleString()}</td>
              <td className="px-4 py-3 border-b border-gray-50">
                {course.discount > 0 ? (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[11px] font-bold">
                    {course.discount}%
                  </span>
                ) : (
                  <span className="text-gray-300 text-base">—</span>
                )}
              </td>
              <td className="px-4 py-3 font-semibold text-gray-900 border-b border-gray-50">
                ₹{course.totalPrice.toLocaleString()}
              </td>
              <td className="px-4 py-3 border-b border-gray-50">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => router.push(`/pages/Edit_Course?course_id=${course.id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors duration-150"
                  >
                    <EditIcon />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-900 bg-gray-900 text-white text-xs font-semibold hover:bg-gray-700 transition-colors duration-150">
                    <ViewIcon />
                    <span>View</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Placeholder Panel ────────────────────────────────────────────────────────
function PlaceholderPanel({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-xl border border-gray-100 gap-3">
      <span className="text-5xl">📋</span>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-400">This section is under construction.</p>
      <div className="flex bg-amber-500 p-5 rounded-2xl align-middle">
        <a href="/pages/create_course" className=" flex text-sm text-black"> <button  className=" flex align-middle"> <Plus /> <p>Create New Course </p></button></a>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CourseHome() {
  const [activeTab, setActiveTab] = useState("Home");

  // ✅ localStorage se courses load karo
  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("courses");
      return saved ? JSON.parse(saved) : mockCourses;
    }
    return mockCourses;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopActionPanel activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-5 overflow-y-auto">
          {activeTab === "Home" && <CoursesTable courses={courses} />}
          {activeTab === "Add Course" && <AddCoursePage/> }
          {activeTab === "Add Category" && <AddCategoryPage/>}
          {activeTab === "Draft Course" && <PlaceholderPanel title="Draft Courses" />}
        </div>
      </main>
    </div>
  );
}