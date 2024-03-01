import React from "react";
import ReactDOM from "react-dom/client";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@mantine/core/styles.layer.css";
import "@mantine/dropzone/styles.css";

import { theme } from "./theme";
import {Home, RegistrationTut, RegistrationSt} from "./scenes";
import Root from "./Root";
import {Login} from "./scenes/Login/index.js";
import {PersonalAreaSt} from "./scenes/PersonalAreaSt/index.js";

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
                path: "/lk_student",
                element: <PersonalAreaSt />,
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
