import { Component, StrictMode } from "react";
import "./index.css";
import PublicLayout from "./layouts/PublicLayout.jsx";
import Home from "./pages/public/Home.jsx";
import About from "./pages/public/About.jsx";
import Contact from "./pages/public/Contact.jsx";

import AppLayout from "./layouts/AppLayout.jsx";
import Dashboard from "./pages/app/Dashboard.jsx";
import Expenses from "./pages/app/Expenses.jsx";
import Categories from "./pages/app/Categories.jsx";
import Budgets from "./pages/app/Budgets.jsx";

import AuthLayout from "./layouts/AuthLayout.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import EmailVerification from "./pages/auth/EmailVerification.jsx";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "authentication",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: SignIn,
      },
      {
        path: "register",
        Component: SignUp,
      },
      {
        path: "register/email-verification",
        Component: EmailVerification,
      },
    ],
  },
  {
    Component: AppLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "expenses",
        Component: Expenses,
      },
      {
        path: "categories",
        Component: Categories,
      },
      {
        path: "budgets",
        Component: Budgets,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="dark" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
