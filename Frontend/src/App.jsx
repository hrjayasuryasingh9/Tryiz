import "./App.css";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import ResetPassword from "./Components/ResetPassword";
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./Components/ForgotPassword";
import WishlistPage from "./Components/WishlistPage";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className=" size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme="light">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword" element={<ResetPassword />} />
        <Route
          path="/wishlist"
          element={authUser ? <WishlistPage /> : <Navigate to="/" />}
        />{" "}
        <Route
          path="/cart"
          element={authUser ? <WishlistPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
