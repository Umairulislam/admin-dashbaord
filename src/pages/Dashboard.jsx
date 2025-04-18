import { Box, Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { DashboardCard } from "../components"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const Dashboard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || []
    setUsers(storedUsers)
  }, [])

  const totalUsers = users.length
  const managerCount = users.filter((user) => user.role === "manager").length
  const employeeCount = users.filter((user) => user.role === "employee").length

  const userGrowthData = [
    { month: "Jan", users: 10 },
    { month: "Feb", users: 20 },
    { month: "Mar", users: 30 },
    { month: "Apr", users: 40 },
    { month: "May", users: 50 },
    { month: "Jun", users: 60 },
  ]

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Admin Dashboard
      </Typography>

      {/* Dashboard Cards */}
      <Grid container spacing={2} mb={4}>
        <DashboardCard title="Total Users" value={totalUsers} />
        <DashboardCard title="Managers" value={managerCount} />
        <DashboardCard title="Employees" value={employeeCount} />
      </Grid>

      {/* Patient Growth Chart */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          User Growth
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userGrowthData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#009689" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  )
}

export default Dashboard
