import React from "react";

import Chat from "./components/Chat/Chat";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
