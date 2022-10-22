import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Something = () => {
  return <div></div>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Something />
  </React.StrictMode>
);
