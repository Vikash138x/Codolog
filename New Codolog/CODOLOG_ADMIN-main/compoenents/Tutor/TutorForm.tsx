"use client";

import { useState } from "react";
import { Tutor } from "./tutor";

interface Props {
  initialData?: Tutor;
  onSubmit: (data: Tutor) => void;
}

export default function TutorForm({
  initialData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Tutor>(
    initialData || {
      name: "",
      email: "",
      phone: "",
      subject: "",
      experience: 0,
      qualification: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "experience"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tutor Name"
        className="border p-2 w-full"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 w-full"
      />

      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="border p-2 w-full"
      />

      <input
        name="experience"
        type="number"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience"
        className="border p-2 w-full"
      />

      <input
        name="qualification"
        value={form.qualification}
        onChange={handleChange}
        placeholder="Qualification"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Save Tutor
      </button>
    </form>
  );
}