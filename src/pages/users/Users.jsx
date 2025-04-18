import {
  Typography,
  Container,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  CircularProgress,
  Chip,
} from "@mui/material"
import { Link } from "react-router-dom"
import { CustomButton, AlertDialog } from "../../components"
import { Edit, Delete, Add } from "../../assets/icons"
import { useState, useEffect } from "react"

// Table column headings
const tableHead = ["Name", "Email", "Phone No", "Role", "Actions"]

const Users = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || []
    setUsers(storedUsers)
  }, [])

  // Delete user from localStorage
  const handleConfirmDelete = (user) => {
    const updatedUsers = users.filter((u) => u.id !== user.id)
    setDialogOpen(false)
    setSelectedUser(null)
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Slice the users based on pagination
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  return (
    <Container>
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Typography variant="h4" fontWeight="bold">
          Users
        </Typography>
        <Link to="create">
          <CustomButton text="Add Users" icon={Add} />
        </Link>
      </Stack>

      {/* Table section */}
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
          marginTop: 4,
          border: "1px solid lightgray",
        }}
      >
        <TableContainer sx={{ height: "calc(100vh - 280px)" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {tableHead.map((head, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      color: "white",
                      backgroundColor: "primary.main",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableHead.length} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No Users found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone_no}</TableCell>
                    <TableCell>
                      <Chip label={row.role} color="primary" />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Edit" arrow>
                          <Link to={`update/${row.id}`}>
                            <IconButton
                              sx={{
                                backgroundColor: "secondary.light",
                                "&:hover": {
                                  backgroundColor: "primary.light",
                                  color: "white",
                                },
                              }}
                            >
                              <Edit />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            onClick={() => handleDeleteClick(row)}
                            sx={{
                              backgroundColor: "secondary.light",
                              "&:hover": {
                                backgroundColor: "primary.light",
                                color: "white",
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination section */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <AlertDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => handleConfirmDelete(selectedUser)}
        title="Confirm Deletion"
        content={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
      />
    </Container>
  )
}

export default Users
