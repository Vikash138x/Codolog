"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTutors } from "@/compoenents/Tutor/api";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    const data = await getTutors();
    setTutors(data);
  };

  const filtered = tutors.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">
          Tutors
        </h1>

        <Link
          href="/pages/tutors/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Tutor
        </Link>
      </div>

      <input
        placeholder="Search tutor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border  p-2 mb-4 w-full"
      />

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((tutor: any) => (
            <tr key={tutor.id}>
              <td>{tutor.name}</td>
              <td>{tutor.subject}</td>
              <td>{tutor.email}</td>

              <td>
                <Link
                  href={`/tutors/${tutor.id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}