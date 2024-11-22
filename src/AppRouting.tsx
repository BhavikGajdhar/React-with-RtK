import { Route, Routes } from "react-router-dom";
import Home from "./core/home/Home";
import RegistrantList from "./pages/Registration/Registration";
import RegistrationForm from "./pages/Registration/component/RegistrationForm";

const AppRouting = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/register/edit/:id" element={<RegistrationForm />} />
      <Route path="/registrants" element={<RegistrantList />} />
      </Routes>
    </div>
  );
};

export default AppRouting;
