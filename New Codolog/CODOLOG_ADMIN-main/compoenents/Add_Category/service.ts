export type Category = {
  id: string;
  Category_Name: string;
  Description: string;
};

const API_URL =
  "https://69e7bfbd68208c1debe94fc4.mockapi.io/contact_form/Add_New_Category";

// get categories
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data.filter(
    (item: Category) =>
      item.Category_Name?.trim() || item.Description?.trim()
  );
};

// create category
export const createCategory = async (payload: {
  Category_Name: string;
  Description: string;
}) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

// update category
export const updateCategory = async (
  id: string,
  payload: {
    Category_Name: string;
    Description: string;
  }
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

// delete category
export const deleteCategory = async (id: string) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};