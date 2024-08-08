// src/main.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import "./i18n.js";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import JobsPage from "./pages/JobsPage.jsx";
import JobDetail from "./pages/job_detail/JobDetail.jsx";
import useAppInitializer from "./common/useAppInitializer.js";
import ProtectedRoute from "./common/ProtectedRoute.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import MediaComponent from "./Components/home/MediaComponent.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import "aos/dist/aos.css"; // Import AOS CSS
import AOS from "aos"; // Import AOS
import "swiper/swiper-bundle.css";
import { HelmetProvider } from "react-helmet-async";
import PasswordResetVerification from "./pages/PasswordResetVerification.jsx";
import 'react-toastify/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/jobs",
        element: <JobsPage />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetail />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<ProfilePage />} />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/verifyCode",
        element: <EmailVerification />,
      },  
      {
        path: "/media",
        element: <MediaComponent />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "password-reset-request",
        element: <PasswordResetVerification />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const AppWrapper = () => {
  useAppInitializer();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <RouterProvider router={route} />
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <AppWrapper />
        <ToastContainer />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
