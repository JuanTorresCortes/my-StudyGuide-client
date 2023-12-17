// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import "./index.css";
import TestPage from "./Pages/TestPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";
import TestArchive from "./Pages/TestArchive.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./Pages/AdminLogin.jsx";
import AdminDashboardPage from "./Pages/AdminDashboardPage.jsx";
import AdminTestBank from "./Pages/AdminTestBank.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/Dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
      {
        path: "/archive",
        element: <TestArchive />,
      },
    ],
  },

  {
    path: "/landingPage",
    element: <LandingPage />,
  },

  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-Dashboard",
    element: <AdminDashboardPage />,
  },
  {
    path: "/admin-test-bank",
    element: <AdminTestBank />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
