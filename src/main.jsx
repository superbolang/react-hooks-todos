// import React, { createContext } from 'react';
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const username = "Greg";
// export const UserContext = React.createContext();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     {/* <App username={username} /> */}
//     <UserContext.Provider value={username}>
//       <App />
//     </UserContext.Provider>
//   </React.StrictMode>,
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
