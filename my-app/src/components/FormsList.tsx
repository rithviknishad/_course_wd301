import { Link, useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
import { Form } from "../types/formTypes";
import { deleteForm, listForms } from "../utils/apiUtils";
import { getLocalForms } from "../utils/storageUtils";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";

const fetchForms = async (setFormsCB: (value: Form[]) => void) => {
  try {
    const data = await listForms({ offset: 0, limit: 10 });
    setFormsCB(data);
  } catch (error) {
    console.log(error);
  }
};

export default function FormsList() {
  const [forms, setForms] = useState<Form[]>(getLocalForms());
  const [newForm, setNewForm] = useState<boolean>(false);

  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    document.title = "Form Editor";
    return () => {
      document.title = "React App";
    };
  });

  useEffect(() => {
    fetchForms(setForms);
  }, []);

  const removeForm = (form: Form) => {
    setForms(forms.filter((f) => form !== f));
    deleteForm(form.id!);
  };

  return (
    <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
      <p className="text-xl">Forms</p>
      <label htmlFor="searchBar">Search</label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <input
          id="searchBar"
          type="text"
          name="search"
          value={searchString}
          className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </form>
      <ul>
        {forms
          .filter((form) =>
            form.title.toLowerCase().includes(searchString.toLowerCase())
          )
          .map((form, index) => (
            <li key={index} tabIndex={0}>
              <FormTile form={form} removeFormCB={() => removeForm(form)} />
            </li>
          ))}
      </ul>
      <div className="flex gap-4">
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => setNewForm(true)}
        >
          New Form
        </button>
        <Link
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          href="/"
        >
          Close
        </Link>
      </div>
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}

function FormTile(props: { form: Form; removeFormCB: () => void }) {
  return (
    <div className="flex">
      <p className="p-4 flex-1">{props.form.title}</p>
      <Link
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        href={`/preview/${props.form.id}`}
      >
        Preview
      </Link>
      <Link
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        href={`/forms/${props.form.id}`}
      >
        Edit
      </Link>
      <button
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        onClick={props.removeFormCB}
      >
        Delete
      </button>
    </div>
  );
}
