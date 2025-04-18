import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link, useLocation } from "react-router-dom"
import { useTheme, useMediaQuery } from "@mui/material"
import { useState } from "react"
import { Dashboard } from "../assets/icons"

export const drawerWidth = 240

const Sidebar = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "Users", path: "/users" },
  ]

  const drawerContent = (
    <>
      <Toolbar>
        <Dashboard />
        <h1 className="font-bold text-xl"> Admin Panel</h1>
      </Toolbar>
      <List sx={{ padding: "10px" }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <ListItem
              key={item.path}
              button
              component={Link}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: "10px",
                marginY: "2px",
                backgroundColor: isActive ? "primary.main" : "transparent",
                color: isActive ? "#fff" : "inherit",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "#fff",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          )
        })}
      </List>
    </>
  )

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <>
          <Box className="absolute top-2 left-2 z-50">
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  )
}

export default Sidebar
