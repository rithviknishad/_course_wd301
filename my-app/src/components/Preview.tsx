import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { preview } from "../types/formTypes";
import {
  getLocalForms,
  getLocalPreviews,
  saveLocalPreviews,
} from "../utils/storageUtils";
import LabelledInput from "./LabelledInput";

export default function Preview(props: { formId: Number }) {
  const [form] = useState(
    getLocalForms().find((form) => form.id === props.formId)!
  );
  useEffect(() => {
    form.id !== props.formId && navigate(`/preview/${form.id}`);
  });

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [preview, setPreview] = useState<preview>(() => {
    let p = getLocalPreviews().find((preview) => preview.id === form.id);
    if (!p) {
      p = {
        id: form.id,
        answers: form.formFields.map((field) => ""),
      };
      saveLocalPreviews([...getLocalPreviews(), p]);
    }
    return p;
  });

  useEffect(() => {
    saveLocalPreviews(
      getLocalPreviews().map((p) => (p.id === form.id ? preview : p))
    );
  }, [preview, form.id]);

  const isLastQuestion = currentQuestionNumber === form.formFields.length - 1;
  const isFirstQuestion = currentQuestionNumber === 0;

  return (
    <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
      <div>
        <LabelledInput
          field={form.formFields[currentQuestionNumber]}
          updateFieldCB={(_: number, newAns: string) => {
            setPreview({
              ...preview,
              answers: preview.answers.map((oldAns, index) =>
                index === currentQuestionNumber ? newAns : oldAns
              ),
            });
          }}
          value={preview.answers[currentQuestionNumber]}
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
