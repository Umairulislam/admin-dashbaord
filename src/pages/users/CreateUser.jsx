import {
  Typography,
  Container,
  Box,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import userSchema from "../../schemas/userSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { CustomButton } from "../../components"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateUser = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Setup form with default values
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema(false)),
    defaultValues: {
      name: "",
      email: "",
      phone_no: "",
      role: "",
    },
  })

  const onSubmit = (data) => {
    setLoading(true)
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || []
      const newUser = {
        id: storedUsers.length + 1,
        ...data,
      }
      storedUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(storedUsers))
      navigate("/users")
    } catch (error) {
      console.error("Error saving user:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Create User
      </Typography>

      <Box
        component="form"
        sx={{ width: "100%", marginTop: 4 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Name
            </Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter name (only alphabets)"
                  variant="outlined"
                  fullWidth
                  error={errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="e.g., example@domain.com"
                  variant="outlined"
                  type="email"
                  fullWidth
                  error={errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Phone Number
            </Typography>
            <Controller
              name="phone_no"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="e.g., +1234567890"
                  variant="outlined"
                  fullWidth
                  error={errors.phone_no}
                  helperText={errors.phone_no?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Role
            </Typography>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  variant="outlined"
                  fullWidth
                  error={errors.role}
                  helperText={errors.role?.message}
                >
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </TextField>
              )}
            />
          </Grid>
        </Grid>

        <CustomButton
          text={!loading ? "Submit" : "Submitting"}
          disabled={loading}
          type="submit"
        />
      </Box>
    </Container>
  )
}

export default CreateUser
