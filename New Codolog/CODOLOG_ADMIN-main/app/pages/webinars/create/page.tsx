"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateWebinar() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slogan: "",
    date: "",
    time: "",
    hostName: "",
    meetingLink: "",
    availableSeats: 100,
    aboutWebinar: "",
  });

  const publish = async () => {
    try {
      if (
        !form.title ||
        !form.slogan ||
        !form.date ||
        !form.time ||
        !form.hostName ||
        !form.meetingLink ||
        !form.aboutWebinar
      ) {
        Swal.fire({
          title: "Validation Error",
          text: "Please fill all fields",
          icon: "warning",
          confirmButtonColor: "#000000",
        });
        return;
      }

      setLoading(true);

      const payload = {
        title: form.title,
        slogan: form.slogan,
        date: form.date,
        time: form.time,
        hostName: form.hostName,
        meetingLink: form.meetingLink,
        availableSeats: Number(form.availableSeats),
        aboutWebinar: form.aboutWebinar,
        status: "UPCOMING",
        isActive: true,
      };

      const defaultHost =
        typeof window !== "undefined"
          ? window.location.hostname
          : "localhost";

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        `http://${defaultHost}:8080`;

      const requestUrl = `${baseUrl}/api/admin/webinars`;

      console.log("API Base URL:", baseUrl);
      console.log("Request URL:", requestUrl);
      console.log("PAYLOAD:", payload);

      const response = await axios.post(
        requestUrl,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("SUCCESS:", response.data);

      localStorage.setItem(
        "webinarId",
        String(response.data.id)
      );

      await Swal.fire({
        title: "Success",
        text: "Webinar created successfully",
        icon: "success",
        confirmButtonColor: "#000000",
      });

      router.push("/pages/webinars/create/topics");
    } catch (error: any) {
      console.error("FULL ERROR:", error);
      console.log("ERROR MESSAGE:", error?.message);
      console.log("ERROR REQUEST:", error?.request);
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);

      Swal.fire({
        title: "API Error",
        text:
          error?.message === "Network Error"
            ? "Cannot connect to the backend. Check API host/port and ensure your server is running."
            : JSON.stringify(error?.response?.data) ||
              error?.message ||
              "Something went wrong",
        icon: "error",
        confirmButtonColor: "#000000",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Create Webinar
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">

          <input
            placeholder="Webinar Title"
            className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-900 placeholder-gray-500 hover:border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            placeholder="Slogan"
            className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-900 placeholder-gray-500 hover:border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={form.slogan}
            onChange={(e) =>
              setForm({
                ...form,
                slogan: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-900 hover:border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />

          <input
            type="time"
            className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-900 hover:border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={form.time}
            onChange={(e) =>
              setForm({
                ...form,
                time: e.target.value,
              })
            }
          />

          <input
            placeholder="Host Name"
            className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-900 placeholder-gray-500 hover:border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={form.hostName}
            onChange={(e) =>
              setForm({
                ...form,
                hostName: e.target.value,
              })
            }
          />

          <input
            placeholder="Meeting Link"
            className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-900 placeholder-gray-500 hover:border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={form.meetingLink}
            onChange={(e) =>
              setForm({
                ...form,
                meetingLink: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Available Seats"
            className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-900 placeholder-gray-500 hover:border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={form.availableSeats}
            onChange={(e) =>
              setForm({
                ...form,
                availableSeats: Number(e.target.value),
              })
            }
          />

          <textarea
            rows={5}
            placeholder="About Webinar"
            className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-900 placeholder-gray-500 hover:border-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={form.aboutWebinar}
            onChange={(e) =>
              setForm({
                ...form,
                aboutWebinar: e.target.value,
              })
            }
          />

          <button
            onClick={publish}
            disabled={loading}
            className="bg-black text-white px-5 py-3 rounded-xl disabled:opacity-50"
          >
            {loading
              ? "Creating Webinar..."
              : "Publish Webinar"}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-xl mb-4 text-gray-900">
            Live Preview
          </h2>

          <div className="bg-gray-900 text-white rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-100">
              {form.title || "Webinar Title"}
            </h3>

            <p className="mt-2 text-gray-300">
              {form.slogan || "Webinar Slogan"}
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-200">
              <p>Date: {form.date || "TBD"}</p>
              <p>Time: {form.time || "TBD"}</p>
              <p>Host: {form.hostName || "Host Name"}</p>
              <p>Seats: {form.availableSeats}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}