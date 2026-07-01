"use client";
import { useEffect, useState } from "react";

// ── Tabler icons CDN — add this to your layout.tsx <head> if not already present:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

// ── Types ──────────────────────────────────────────────────────────────────
interface ScheduleItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  countdown: string;
  countdownUnit?: string;
  countdownType: "text" | "number";
}

interface StatsData {
  totalStudents: number;
  liveCourses: number;
  coursesLive: number;
  studentGrowth: string;
  courseGrowth: string;
  coursesLiveGrowth: string;
  adminName: string;
  activeusers: number;
  Activerpercent:string;
}

interface CourseItem {
  title: string;
  category: string;
  duration: string;
}

// ── Mock API ────────────────────────────────────────────────────────────────
const SCHEDULE_API = "https://69c2948c7518bf8facbed538.mockapi.io/schedule";

async function fetchStats(): Promise<StatsData> {
  return {
    adminName: "Shivam Dubey",
    totalStudents: 13000,
    liveCourses: 13000,
    coursesLive: 50,
    studentGrowth: "25%",
    courseGrowth: "25%",
    coursesLiveGrowth: "25%",
    activeusers: 500000,
    Activerpercent: "60%"
  };
}

async function fetchPopularCourses(): Promise<CourseItem[]> {
  return [
    { title: "React Js From Beginning", category: "Web Development", duration: "4 Months" },
    { title: "How to Create Resume", category: "Career Skills", duration: "2 Months" },
    { title: "UI/UX Fundamentals", category: "Design", duration: "3 Months" },
  ];
}

// ── Accent helpers for schedule cards ─────────────────────────────────────
type AccentKey = "amber" | "teal" | "coral" | "blue";

const ACCENT_MAP: Record<string, AccentKey> = {
  "Live Lecture": "coral",
  Workshop: "teal",
  Seminar: "amber",
  Tutorial: "blue",
};

const ICON_MAP: Record<string, string> = {
  "Live Lecture": "ti-school",
  Workshop: "ti-users",
  Seminar: "ti-clipboard-text",
  Tutorial: "ti-book",
};

const ACCENT_STYLES: Record<AccentKey, { bar: string; dot: string }> = {
  coral: {
    bar: "bg-[#D85A30]",
    dot: "bg-[#FAECE7] text-[#993C1D]",
  },
  teal: {
    bar: "bg-[#1D9E75]",
    dot: "bg-[#E1F5EE] text-[#0F6E56]",
  },
  amber: {
    bar: "bg-[#EF9F27]",
    dot: "bg-[#FAEEDA] text-[#854F0B]",
  },
  blue: {
    bar: "bg-[#378ADD]",
    dot: "bg-[#E6F1FB] text-[#185FA5]",
  },
};

function getAccent(subtitle: string): AccentKey {
  return ACCENT_MAP[subtitle] ?? "blue";
}

// ── Stat Card ──────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number | null;
  growth: string | undefined;
  icon: string;
}

function StatCard({ label, value, growth, icon }: StatCardProps) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 flex flex-col justify-between h-[148px] group hover:border-stone-300 transition-colors">
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">{label}</p>
      <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0">
  <i className={`ti ${icon}`} style={{ fontSize: 18, color: "white" }} aria-hidden="true" />
</div>
        <span className="text-4xl font-bold text-stone-900 leading-none tabular-nums">
          {value !== null && value !== undefined
            ? typeof value === "number"
              ? value.toLocaleString()
              : value
            : "—"}
        </span>
      </div>
      <p className="text-xs text-stone-400 flex items-center gap-1.5">
        <i className="ti ti-trending-up text-[13px] text-emerald-500" aria-hidden="true" />
        <span className="text-emerald-600 font-semibold">{growth ?? "—"}</span>
        <span>vs last month</span>
      </p>
    </div>
  );
}

// ── Schedule Card ──────────────────────────────────────────────────────────
function ScheduleCard({ item }: { item: ScheduleItem }) {
  const accent = getAccent(item.subtitle);
  const { bar, dot } = ACCENT_STYLES[accent];
  const iconClass = ICON_MAP[item.subtitle] ?? "ti-calendar";

  return (
    <div className="relative overflow-hidden bg-white border border-stone-200 rounded-xl grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-4 hover:border-stone-300 transition-colors">
      {/* Left accent bar */}
      <span className={`absolute left-0 top-0 bottom-0 w-[3px] ${bar}`} aria-hidden="true" />

      {/* Title + badge */}
      <div className="min-w-0 pl-1">
        <p className="text-sm font-semibold text-stone-900 leading-snug truncate">{item.title}</p>
        <span className={`inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold rounded-full px-2.5 py-0.5 ${dot}`}>
          <i className={`ti ${iconClass} text-[11px]`} aria-hidden="true" />
          {item.subtitle}
        </span>
      </div>

      {/* Date & time */}
      <div className="text-right shrink-0 hidden sm:block">
        <p className="text-xs font-medium text-stone-800">{item.date}</p>
        <p className="text-[11px] text-stone-400 mt-0.5">{item.time}</p>
      </div>

      {/* Countdown */}
      <div className="shrink-0 min-w-[60px] flex justify-center">
        {item.countdownType === "text" ? (
          <div className="bg-[#E1F5EE] text-[#0F6E56] text-[11px] font-bold rounded-lg px-3 py-2 text-center leading-snug">
            {item.countdown}
          </div>
        ) : (
          <div className="bg-[#EAF3DE] rounded-lg px-3 py-2 text-center">
            <p className="font-mono text-[22px] font-medium text-[#3B6D11] leading-none">{item.countdown}</p>
            <p className="text-[10px] font-semibold text-[#639922] mt-0.5 uppercase tracking-wide">
              {item.countdownUnit ?? "min"}
            </p>
          </div>
        )}
      </div>

      {/* Join Now */}
      <button className="shrink-0 flex items-center gap-1.5 bg-stone-900 hover:bg-stone-700 transition-colors text-white font-semibold text-xs rounded-lg px-4 py-2.5 whitespace-nowrap">
        <i className="ti ti-player-play text-[13px]" aria-hidden="true" />
        Join now
      </button>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState<StatsData | null>(null);
  const [popularCourses, setPopularCourses] = useState<CourseItem[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  useEffect(() => {
    setGreeting(getGreeting());
    fetchStats().then(setStats);
    fetchPopularCourses().then(setPopularCourses);

    fetch(SCHEDULE_API)
      .then((res) => res.json())
      .then((data) => setSchedule(Array.isArray(data) ? data : []))
      .catch(() => setSchedule([]))
      .finally(() => setScheduleLoading(false));
  }, []);

  const now = new Date();
  const dateString = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-8 font-sans">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            {greeting}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
            {stats?.adminName ?? "Loading…"}
          </h1>
          <p className="text-xs text-stone-400 mt-1">{dateString}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5">
          <i className="ti ti-bell text-stone-400 text-[18px]" aria-hidden="true" />
          <span className="text-xs font-semibold text-stone-500">Notifications</span>
        </div>
      </div>

      {/* ── Stat Cards + Popular Courses ── */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">

        {/* Stats grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Students"
            value={stats?.totalStudents ?? null}
            growth={stats?.studentGrowth}
            icon="ti-school"
          />
          <StatCard
            label="Live Courses"
            value={stats?.liveCourses ?? null}
            growth={stats?.courseGrowth}
            icon="ti-device-tv"
          />
          <StatCard
            label="Courses Live"
            value={stats?.coursesLive ?? null}
            growth={stats?.coursesLiveGrowth}
            icon="ti-user-check"
          />

          <StatCard
            label="Active users"
            value={stats?.activeusers ?? null}
            growth={stats?.Activerpercent}
            icon="ti-user-check"
          />

          <StatCard
            label="Total Tutor"
            value={stats?.coursesLive ?? null}
            growth={stats?.coursesLiveGrowth}
            icon="ti-chalkboard-teacher"
          />

          <StatCard
            label="Total Earning"
            value={stats?.coursesLive ?? null}
            growth={stats?.coursesLiveGrowth}
            icon="ti-currency-rupee"
          />

       
        
        </div>

        {/* Popular Courses */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 flex flex-col w-full lg:w-72 shrink-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Popular Courses
            </p>
            <span className="text-[11px] text-stone-400 bg-stone-200 rounded-full px-2 py-0.5">
              Top {popularCourses.length}
            </span>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            {popularCourses.length === 0
              ? [1, 2, 3].map((i) => (
                  <div key={i} className="h-[52px] rounded-xl bg-stone-200 animate-pulse" />
                ))
              : popularCourses.map((course, i) => (
                  <div
                    key={i}
                    className="bg-white border border-stone-200 rounded-xl px-3 py-2.5 flex items-start gap-2.5 hover:border-stone-300 transition-colors"
                  >
                    <span className="mt-0.5 text-[11px] font-bold text-stone-400 tabular-nums w-4 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-800 truncate">{course.title}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5 truncate">
                        {course.category} &middot; {course.duration}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-stone-100" />
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-300">Schedule</p>
        <div className="flex-1 h-px bg-stone-100" />
      </div>

      {/* ── Upcoming Schedule ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            Upcoming Sessions
          </p>
          {!scheduleLoading && schedule.length > 0 && (
            <span className="text-[11px] text-stone-400 bg-stone-100 border border-stone-200 rounded-full px-2.5 py-0.5">
              {schedule.length} session{schedule.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {scheduleLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[68px] rounded-xl bg-stone-100 animate-pulse" />
            ))}
          </div>
        ) : schedule.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-stone-300">
            <i className="ti ti-calendar-off text-4xl mb-2" aria-hidden="true" />
            <p className="text-sm font-medium">No upcoming sessions</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {schedule.map((item) => (
              <ScheduleCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}