import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import reportWebVitals from "./reportWebVitals";

Sentry.init({
  dsn: "https://1f5c4d46efac42bea7bd92f51cdecfbf@o1206520.ingest.sentry.io/6356419",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
