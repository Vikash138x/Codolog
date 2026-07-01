"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import {
  Category,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./service";

type Errors = {
  categoryName?: string;
  description?: string;
};

export default function AddCategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const validate = () => {
    const newErrors: Errors = {};

    if (!categoryName.trim()) {
      newErrors.categoryName = "Category name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setCategoryName("");
    setDescription("");
    setEditId(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const payload = {
      Category_Name: categoryName,
      Description: description,
    };

    try {
      if (editId) {
        await updateCategory(editId, payload);
        setSuccessMessage("Category updated successfully");
      } else {
        await createCategory(payload);
        setSuccessMessage("Category saved successfully");
      }

      await fetchCategories();
      resetForm();

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (error) {
      console.error("Failed to save category", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Category) => {
    setCategoryName(item.Category_Name);
    setDescription(item.Description);
    setEditId(item.id);
    setErrors({});
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      setSuccessMessage("Category deleted successfully");

      await fetchCategories();

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* top tab bar */}
   

      <div className="p-6 md:p-8">
        {successMessage && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {/* form */}
        <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-6 md:p-8 mb-8">
          <div className="grid gap-6">
            {/* category name */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Category Name
              </label>

              <input
                type="text"
                value={categoryName}
                placeholder={
                  errors.categoryName
                    ? "Category name is required"
                    : "Enter category name"
                }
                onChange={(e) => {
                  setCategoryName(e.target.value);

                  if (e.target.value.trim()) {
                    setErrors((prev) => ({
                      ...prev,
                      categoryName: "",
                    }));
                  }
                }}
                className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-sm ${
                  errors.categoryName
                    ? "border border-red-500 text-red-500 placeholder:text-red-500"
                    : "border border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
                }`}
              />
            </div>

            {/* description */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                placeholder={
                  errors.description
                    ? "Description is required"
                    : "Enter category description"
                }
                onChange={(e) => {
                  setDescription(e.target.value);

                  if (e.target.value.trim()) {
                    setErrors((prev) => ({
                      ...prev,
                      description: "",
                    }));
                  }
                }}
                className={`w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition placeholder:text-sm ${
                  errors.description
                    ? "border border-red-500 text-red-500 placeholder:text-red-500"
                    : "border border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
                }`}
              />
            </div>

            {/* button */}
            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:opacity-95 transition disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Category"
                  : "Save Category"}
              </button>
            </div>
          </div>
        </div>

        {/* table */}
        <div className="bg-white rounded-2xl border border-gray-400 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              View Category
            </h2>
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-[520px]">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-left text-gray-900">
                  <th className="px-6 py-4 font-medium">Sr. No</th>
                  <th className="px-6 py-4 font-medium">Category Name</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>

                    <td className="px-6 py-4 font-medium text-gray-700">
                      {item.Category_Name}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {item.Description}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center gap-2 border border-gray-400 px-3 text-blue-500 py-2 rounded-lg text-sm hover:bg-gray-50"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center gap-2 border border-red-400 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No categories available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}