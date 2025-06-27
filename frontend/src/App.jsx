import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Account from "./pages/Accounts/Account";
import Transaction from "./pages/Transcation/Transcation";
import TranscationForm from "./pages/TranscationForm/TranscationForm";

const App = () => {
  return (
    <div className="transcation_container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/transcations" element={<Transaction />} />
        <Route path="/form" element={<TranscationForm />} />
      </Routes>
    </div>
  );
};

export default App;
