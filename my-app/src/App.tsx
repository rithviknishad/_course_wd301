import React, { useState } from "react";
import Header from "./Header";

import AppContainer from "./AppContainer";
import { Home } from "./components/Home";
import { Form } from "./components/Form";

function App() {
  const [state, setState] = useState("HOME");

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };

  return (
    <AppContainer>
      <Header
        title={"Welcome to Lesson 5 of $react-typescript with tailwindcss"}
      />
      {state === "HOME" ? (
        <Home openFormCB={openForm} />
      ) : (
        <Form closeFormCB={closeForm} />
      )}
    </AppContainer>
  );
}

export default App;
