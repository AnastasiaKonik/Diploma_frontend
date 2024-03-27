import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "@mantine/dropzone/styles.css";

import { theme } from "./theme";

import Root from "./Root";
import {Home, RegistrationTut, RegistrationSt} from "./scenes";
import {Login} from "./scenes/Login/index.js";
import {StudentPage} from "./scenes/StudentPage/index.js";
import {PersonalAreas} from "./scenes/PersonalAreas/index.js";

// export const ApiPath2 = "http://api/v0/"
export const ApiPath = "http://localhost:8000/api"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/registration_tutor",
                element: <RegistrationTut />,
            },
            {
                path: "/registration_student",
                element: <RegistrationSt />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/profile",
                element: <PersonalAreas />,
            },
            {
                path: "/student_page",
                element: <StudentPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto" theme={theme}>
          <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>,
)
