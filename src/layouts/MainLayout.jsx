import { Outlet } from "react-router-dom"
import Sidebar, { drawerWidth } from "../components/Sidebar"
import Header from "../components/Header"

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
