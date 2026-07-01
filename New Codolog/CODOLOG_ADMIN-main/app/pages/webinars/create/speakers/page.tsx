"use client";

import { useState } from "react";
import axios from "axios";

export default function SpeakersPage() {
  const [speakerName,setSpeakerName] =
    useState("");

  const [speakerRole,setSpeakerRole] =
    useState("");

  const [initials,setInitials] =
    useState("");

  const addSpeaker = async () => {
    const webinarId =
      localStorage.getItem("webinarId");

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/webinars/${webinarId}/speakers`,
      {
        speakerName,
        speakerRole,
        initials
      }
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Speakers
      </h1>

      <input
        placeholder="Speaker Name"
        className="border p-3 rounded-lg w-full mt-6"
        onChange={(e)=>
          setSpeakerName(e.target.value)
        }
      />

      <input
        placeholder="Speaker Role"
        className="border p-3 rounded-lg w-full mt-4"
        onChange={(e)=>
          setSpeakerRole(e.target.value)
        }
      />

      <input
        placeholder="Initials"
        className="border p-3 rounded-lg w-full mt-4"
        onChange={(e)=>
          setInitials(e.target.value)
        }
      />

      <button
        onClick={addSpeaker}
        className="mt-6 bg-black text-white px-5 py-3 rounded-xl"
      >
        Add Speaker
      </button>
    </div>
  );
}