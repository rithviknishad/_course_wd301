import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { formField } from "../types/fieldTypes";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import InputField from "./InputField";

export default function PreviewForm(props: { formId: Number }) {
  const [form, setForm] = useState(
    getLocalForms().find((form) => form.id === props.formId)!
  );
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(-1);

  useEffect(() => {
    form.id !== props.formId && navigate(`/preview/${form.id}`);
  });

  useEffect(() => {
    saveLocalForms(getLocalForms().map((f) => (f.id === form.id ? form : f)));
  }, [form]);

  const quizStarted = currentQuestionNumber >= 0;
  const isLastQuestion = currentQuestionNumber === form.formFields.length - 1;
  const isFirstQuestion = currentQuestionNumber === 0;

  if (!quizStarted) {
    return (
      <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
        <p>Take the quiz</p>
        <p className="font-bold text-2xl">{form.title}</p>
        <p>There are {form.formFields.length} questions ahead...</p>
        {form.formFields.length > 0 && (
          <div className="flex gap-2">
            <button
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
              onClick={() => {
                setCurrentQuestionNumber(0);
              }}
            >
              Start
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
      <div>
        <InputField
          field={form.formFields[currentQuestionNumber]}
          updateFieldCB={(newField: formField) => {
            setForm({
              ...form,
              formFields: form.formFields.map((f, i) =>
                i === currentQuestionNumber ? newField : f
              ),
            });
          }}
        />
      </div>
      <div className="flex gap-2">
        {!isFirstQuestion && (
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
            onClick={() => {
              setCurrentQuestionNumber(currentQuestionNumber - 1);
            }}
          >
            Back
          </button>
        )}
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => {
            isLastQuestion
              ? navigate("/forms")
              : setCurrentQuestionNumber(currentQuestionNumber + 1);
          }}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
