import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EmailConfirmationForm from "./pages/EmailConfirmationForm";
import LoginAwsForm from "./pages/LoginAwsForm";
import NavBar from "./components/NavBar";
import RegisterAwsForm from "./pages/RegisterAwsForm";
import Home from "./pages/Home";
import CompleteRegisterForm from "./pages/CompleteRegisterForm";
import UserUpdate from "./pages/UserUpdate";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
          <Route
            path="/complete-register-form"
            element={<CompleteRegisterForm />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/register-aws-form" element={<RegisterAwsForm />} />
          <Route
            path="/email-confirmation-form"
            element={<EmailConfirmationForm />}
          />
          <Route path="/login-aws-form" element={<LoginAwsForm />} />
          <Route path="/user-update" element={<UserUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
