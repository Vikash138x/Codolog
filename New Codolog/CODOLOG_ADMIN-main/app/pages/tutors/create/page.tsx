"use client";

import { useRouter } from "next/navigation";
import TutorForm from "@/compoenents/Tutor/TutorForm";
import { createTutor, getTutor, updateTutor } from "@/compoenents/Tutor/api";

export default function CreateTutor() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await createTutor(data);
    router.push("/tutors");
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-xl font-bold mb-5">
        Create Tutor
      </h1>

      <TutorForm onSubmit={handleCreate} />
    </div>
  );
}