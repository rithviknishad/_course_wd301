import React from "react";
import Header from "./Header";

import AppContainer from "./AppContainer";

const formFields = [
  { label: "First Name" },
  { label: "Last Name" },
  { label: "Email", type: "email" },
  { label: "Date of Birth", type: "date" },
  { label: "Phone Number", type: "tel" },
];

function App() {
  return (
    <AppContainer>
      <Header
        title={"Welcome to Lesson 5 of $react-typescript with tailwindcss"}
      />
      {formFields.map((field, index) => (
        <React.Fragment key={index}>
          <label className="m-1">{field.label}</label>
          <input
            type={field.type ?? "text"}
            className="border-2 border-blue-100 rounded-lg p-2 mb-4 mt-2 w-full"
          />
        </React.Fragment>
      ))}
      <input
        type="submit"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        value="Submit"
      />
    </AppContainer>
  );
}

export default App;
