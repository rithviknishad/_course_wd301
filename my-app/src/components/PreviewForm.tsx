import { navigate } from "raviger";
import React, { useEffect, useReducer } from "react";
import { formField } from "../types/fieldTypes";
import { formData } from "../types/formTypes";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import InputField from "./InputField";

type StartQuestion = {
  type: "start";
};

type NextQuestion = {
  type: "next";
  max_questions: number;
};

type PreviousQuestion = {
  type: "previous";
};

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

type UpdateFieldAnswer = {
  type: "update_field_answer";
  question: number;
  field: formField;
};

type PreviewFormActions = UpdateFieldAnswer;

const formReducer = (state: formData, action: PreviewFormActions) => {
  switch (action.type) {
    case "update_field_answer":
      return {
        ...state,
        formFields: state.formFields.map((field, question) =>
          question === action.question ? action.field : field
        ),
      };
  }
};

export default function PreviewForm(props: { formId: Number }) {
  const [form, dispatchForm] = useReducer(
    formReducer,
    getLocalForms().find((form) => form.id === props.formId)!
  );
  const [currentQuestion, dispatchQuestion] = useReducer(questionReducer, -1);

  useEffect(() => {
    form.id !== props.formId && navigate(`/preview/${form.id}`);
  });

  useEffect(() => {
    saveLocalForms(getLocalForms().map((f) => (f.id === form.id ? form : f)));
  }, [form]);

  const quizStarted = currentQuestion >= 0;
  const isLastQuestion = currentQuestion === form.formFields.length - 1;
  const isFirstQuestion = currentQuestion === 0;

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
          field={form.formFields[currentQuestion]}
          updateFieldCB={(field: formField) => {
            dispatchForm({
              type: "update_field_answer",
              question: currentQuestion,
              field: field,
            });
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
              ? navigate("/forms")
              : dispatchQuestion({
                  type: "next",
                  max_questions: form.formFields.length,
                });
          }}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
