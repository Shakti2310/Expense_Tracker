import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expanses from "./pages/Expanses.jsx";
import Categories from "./pages/Categories.jsx";
import Budgets from "./pages/Budgets.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import UserAuthPage from "./pages/UserAuthPage.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { Component: Home, index: true },
      {
        path: "authentication",
        Component: UserAuthPage,
        children: [
          {
            path: "register",
            Component: SignUp,
            children: [
              {
                path: "email-verification",
                Component: EmailVerification,
              },
            ],
          },
          { path: "login", Component: SignIn },
        ],
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "expenses",
        Component: Expanses,
      },
      {
        path: "categories",
        Component: Categories,
      },
      {
        path: "budgets",
        Component: Budgets,
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
