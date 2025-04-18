import { Avatar, Toolbar } from "@mui/material"

const Header = () => {
  return (
    <Toolbar className="flex justify-end bg-white shadow-sm">
      <Avatar alt="User" src="https://i.pravatar.cc/40" />
    </Toolbar>
  )
}

export default Header
