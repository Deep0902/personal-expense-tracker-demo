import "./App.css";
import AddBasicAPI from "./components/AddBasicAPI";
import BasicAPI from "./components/BasicAPI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import DummyData from "./components/DummyData";
import LandingPage from "./components/LandingPage/LandingPage";
import DeviceDimensions from "./components/DeviceDimensions";
import SignIn from "./components/SignIn/SignIn";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/AddExpense">Add Basic API</Link>
            </li>
            <li>
              <Link to="/BasicAPI">Basic API</Link>
            </li>
          </ul>
        </nav>
      </div> */}
      <Routes>
        <Route index path="/personal-expense-tracker-demo" element={<HomePage />} />
        <Route path="/personal-expense-tracker-demo/BasicAPI" element={<BasicAPI />} />
        <Route path="/personal-expense-tracker-demo/AddExpense" element={<AddBasicAPI />} />
        <Route path="/personal-expense-tracker-demo/DummyData" element={<DummyData />} />
        <Route path="/personal-expense-tracker-demo/DeviceDimentions" element={<DeviceDimensions />} />
        
        <Route path="/personal-expense-tracker-demo/UserLogin" element={<UserLogin />} />
        <Route path="/personal-expense-tracker-demo/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/personal-expense-tracker-demo/LandingPage" element={<LandingPage />} />
        <Route path="/personal-expense-tracker-demo/SignIn" element={<SignIn />} />
        <Route path="/personal-expense-tracker-demo/AdminLogin" element={<AdminLogin />} />
        {/* <Route path="/personal-expense-tracker-demo/UserDashboard" element={<UserDashboard />} /> */}
        <Route path="/personal-expense-tracker-demo/UserDashboard/*" element={<UserDashboard />} />
        <Route path="/personal-expense-tracker-demo/SignUp" element={<SignUp />} />
        <Route path="/personal-expense-tracker-demo/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
