import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import { Dashboard, Users, CreateUser, UpdateUser } from "../pages"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "users/create", element: <CreateUser /> },
      { path: "users/update/:id", element: <UpdateUser /> },
    ],
  },
])

export default routes
