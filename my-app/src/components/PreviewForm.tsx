import { navigate } from "raviger";
import React, { useEffect, useReducer, useState } from "react";
import { FormField } from "../types/fieldTypes";
import { Form, Submission } from "../types/formTypes";
import { createSubmission, getForm, listFormFields } from "../utils/apiUtils";
import InputField from "./InputField";

type StartQuestion = { type: "start" };
type NextQuestion = { type: "next"; max_questions: number };
type PreviousQuestion = { type: "previous" };
type QuestionActions = StartQuestion | NextQuestion | PreviousQuestion;

const questionReducer = (state: number, action: QuestionActions) => {
  switch (action.type) {
    case "start":
      return 0;

    case "next":
      return action.max_questions === state + 1 ? state : state + 1;

    case "previous":
      return state > 0 ? state - 1 : state;
  }
};

const fetchForm = async (formId: number, setFormCB: (value: Form) => void) => {
  try {
    const data = await getForm(formId);
    setFormCB(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchFormFields = async (
  formId: number,
  setFormFieldsCB: (value: FormField[]) => void
) => {
  try {
    const data = await listFormFields(formId);
    setFormFieldsCB(data);
  } catch (error) {
    console.log(error);
  }
};

export default function PreviewForm(props: { formId: number }) {
  const [form, setForm] = useState<Form | null>(() => null);
  const [fields, setFields] = useState<FormField[] | null>(() => null);
  const [currentQuestion, dispatchQuestion] = useReducer(questionReducer, -1);
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    fetchForm(props.formId, setForm);
    fetchFormFields(props.formId, setFields);
  }, [props.formId]);

  useEffect(() => {
    if (fields)
      setSubmission({
        answers: fields.map((field) => {
          return { form_field: field.id!, value: field.value };
        }),
      });
  }, [fields]);

  useEffect(() => {
    form && form!.id !== props.formId && navigate(`/preview/${form!.id}`);
  }, [props.formId, form]);

  const quizStarted = currentQuestion >= 0;
  const isLastQuestion = currentQuestion === (fields?.length ?? 1) - 1;
  const isFirstQuestion = currentQuestion === 0;

  const submitForm = async () => {
    if (!submission) return;
    try {
      await createSubmission(props.formId, submission);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!form || !fields) return <div>Loading...</div>;

  if (!quizStarted) {
    return (
      <div className="flex flex-col gap-4 p-4 divide-y divide-dotted">
        <p>Take the quiz</p>
        <p className="font-bold text-2xl">{form.title}</p>
        <p>There are {fields.length} questions ahead...</p>
        {fields.length > 0 && (
          <div className="flex gap-2">
            <button
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
              onClick={() => {
                dispatchQuestion({ type: "start" });
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
          field={fields[currentQuestion]}
          updateFieldCB={(field: FormField) => {
            setFields(fields.map((f) => (f.id === field.id ? field : f)));
          }}
        />
      </div>
      <div className="flex gap-2">
        {!isFirstQuestion && (
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
            onClick={() => {
              dispatchQuestion({ type: "previous" });
            }}
          >
            Back
          </button>
        )}
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
          onClick={(_) => {
            isLastQuestion
              ? submitForm()
              : dispatchQuestion({
                  type: "next",
                  max_questions: fields.length,
                });
          }}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
