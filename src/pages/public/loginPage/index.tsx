import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginTypeRequest } from "../../../types/requests/loginTypeRequests";
import { LoginSchemaRequest } from "../../../schemas/pages/public/loginSchemaRequest";
import useAuth from "../../../context/auth/useAuth";
import { useState } from "react";

export default function LoginPage() {
  const [loginError, setLoginError] = useState<boolean>(false);
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginTypeRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchemaRequest),
  });

  const onSubmit: SubmitHandler<LoginTypeRequest> = (data) => {
    console.log("debug login page login", data);
    setLoginError(false);
    login(
      {
        email: data.email,
        password: data.password,
      },
      () => setLoginError(true)
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Acessar
        </Typography>
        {loginError && (
          <Typography
            component="p"
            variant="subtitle1"
            sx={{
              color: "error.main",
              textAlign: "center",
            }}
          >
            Email ou Senha inválidos!
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            aria-describedby="email-field"
            inputProps={{ "data-testid": "login-email" }}
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            aria-describedby="password-field"
            inputProps={{ "data-testid": "login-password" }}
            margin="normal"
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Acessar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Registre-se aqui!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
