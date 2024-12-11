// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import DynamicRoutes from "./CMS/Utils/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <DynamicRoutes />
    </BrowserRouter>
  );
};

export default App;
