"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function WebinarPage() {
  const router = useRouter();

  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    loadWebinars();
  }, []);

  const loadWebinars = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/webinars`
    );

    setWebinars(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-8 py-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div></div>

          <button
          onClick={() =>
            router.push(
              "/pages/webinars/create"
            )
          }
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Create Webinar
        </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="bg-gray-200 border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
          <thead className="bg-gray-300 text-gray-900">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">
                Title
              </th>
              <th className="p-4 text-sm font-semibold">Date</th>
              <th className="p-4 text-sm font-semibold">Host</th>
              <th className="p-4 text-sm font-semibold">Seats</th>
              <th className="p-4 text-sm font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {webinars.map((item: any) => (
              <tr
                key={item.id}
                className="border-t bg-gray-50 hover:bg-white"
              >
                <td className="p-4 text-gray-900">
                  {item.title}
                </td>

                <td className="p-4 text-gray-700">{item.date}</td>

                <td className="p-4 text-gray-700">{item.hostName}</td>

                <td className="p-4 text-gray-700">
                  {item.availableSeats}
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}