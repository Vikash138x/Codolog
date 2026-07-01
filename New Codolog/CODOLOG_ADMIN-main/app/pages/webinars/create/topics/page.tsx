"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function TopicsPage() {
  const router = useRouter();
  const [topic,setTopic] = useState("");

  const addTopic = async () => {
    const webinarId =
      localStorage.getItem("webinarId");

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/webinars/${webinarId}/topics`,
      {
        topicName:topic
      }
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Webinar Topics
      </h1>

      <input
        className="border p-3 rounded-lg w-full mt-6"
        placeholder="Topic Name"
        value={topic}
        onChange={(e)=>
          setTopic(e.target.value)
        }
      />

      <button
        onClick={addTopic}
        className="mt-4 bg-black text-white px-5 py-3 rounded-xl"
      >
        Add Topic
      </button>

      <button
        onClick={() =>
          router.push(
            "/pages/webinars/create/speakers"
          )
        }
        className="mt-8 bg-blue-600 text-white px-5 py-3 rounded-xl"
      >
        Next : Speakers
      </button>
    </div>
  );
}