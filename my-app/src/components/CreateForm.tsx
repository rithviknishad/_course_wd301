import { navigate } from "raviger";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Errors } from "../types/commons";
import { Form, validateForm } from "../types/formTypes";
import { createForm } from "../utils/apiUtils";

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: false,
  });

  const [errors, setErrors] = useState<Errors<Form>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      toast("Form has been created");
      const data = await createForm(form);
      navigate(`/forms/${data.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Create Form</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className={`${errors.title ? "text-red-500" : ""}`}>
          <label htmlFor="title">Title</label>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className={`${errors.description ? "text-red-500" : ""}`}>
          <label htmlFor="description">Description</label>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="is_public"
            className={`${errors.description ? "text-red-500" : ""}`}
          >
            Is Public
          </label>
          <input
            className="mr-2 border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="checkbox"
            id="is_public"
            name="is_public"
            value={form.is_public ? "true" : "false"}
            onChange={(e) => {
              setForm({ ...form, is_public: e.target.checked });
            }}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
