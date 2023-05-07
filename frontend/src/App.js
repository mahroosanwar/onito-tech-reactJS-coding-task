import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/Layout/Layout";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import UsersData from "./components/UsersData/UsersData";
import MainCard from "./components/MainCard/MainCard";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <Layout onClick={openHandler}>
      {/* {isOpen && <RegistrationForm onClose={closeHandler} />} */}
      <Routes>
        <Route path="/" element={<MainCard />} />
        {isOpen && (
          <Route
            path="registration-form"
            element={<RegistrationForm onClose={closeHandler} />}
          />
        )}
        <Route path="users-data" element={<UsersData />} />
      </Routes>
    </Layout>
  );
}

export default App;
