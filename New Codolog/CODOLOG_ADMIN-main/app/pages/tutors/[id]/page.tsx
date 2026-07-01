"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TutorForm from "@/compoenents/Tutor/TutorForm";
import { getTutor, updateTutor } from "@/compoenents/Tutor/api";

export default function EditTutor() {
  const params = useParams();
  const router = useRouter();

  const [tutor, setTutor] = useState<any>();

  useEffect(() => {
    loadTutor();
  }, []);

  const loadTutor = async () => {
    const data = await getTutor(params.id as string);
    setTutor(data);
  };

  const handleUpdate = async (data: any) => {
    await updateTutor(
      params.id as string,
      data
    );

    router.push("/pages/tutors");
  };

  if (!tutor) return <p>Loading...</p>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-xl font-bold mb-5">
        Edit Tutor
      </h1>

      <TutorForm
        initialData={tutor}
        onSubmit={handleUpdate}
      />
    </div>
  );
}