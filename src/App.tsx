import "./App.css";
import { Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";
import SearchResultsPage from "./pages/SearchResultsPage";
import { useEffect } from "react";
import SignUpPage from "./pages/authPages/SignUpPage";
import LoginPage from "./pages/authPages/LoginPage";
import ForgotPasswordPage from "./pages/authPages/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/authPages/UpdatePasswordPage";
import UpdateProfile from "@/src/pages/UpdateProfile";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path='/search'
          element={<SearchResultsPage />}
        />
        <Route
          path='/sign-up'
          element={<SignUpPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/forgot-password'
          element={<ForgotPasswordPage />}
        />
        <Route
          path='/update-password'
          element={<UpdatePasswordPage />}
        />
        <Route
          path='/update-profile'
          element={<UpdateProfile />}
        />
      </Route>
    </Routes>
  );
}

export default App;
