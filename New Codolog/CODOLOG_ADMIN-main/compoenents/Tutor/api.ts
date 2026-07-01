const BASE_URL = "http://localhost:5000/api";

export const getTutors = async () => {
  const res = await fetch(`${BASE_URL}/tutors`);
  return res.json();
};

export const getTutor = async (id: string) => {
  const res = await fetch(`${BASE_URL}/tutors/${id}`);
  return res.json();
};

export const createTutor = async (data: any) => {
  const res = await fetch(`${BASE_URL}/tutors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateTutor = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/tutors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};