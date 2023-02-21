import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import MissingEmployeesList from "./Pages/MissingEmployeesList";
import EquipmentList from "./Pages/EquipmentList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EquipmentCreator from "./Pages/EquipmentCreator"
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import RobertList from "./Pages/RobertList";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import EmployeeTable from "./Components/EmployeeTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/equipments",
        element: <EquipmentList />,
      },
      {
        path: "/robert",
        element: <RobertList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/missing",
        element: <EmployeeTable />,
      },
      {
        path: "/create-equipment",
        element: <EquipmentCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/update-equipment/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
