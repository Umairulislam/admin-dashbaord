import React from "react"
import { RouterProvider } from "react-router-dom"
import appRouter from "./routes/routes"

const App = () => {
  return <RouterProvider router={appRouter} />
}

export default App
