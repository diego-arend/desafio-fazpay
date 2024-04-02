import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterTypeRequest } from "../../../types/requests/registerTypeRequest";
import { RegisterSchemaRequest } from "../../../schemas/pages/public/registerSchemaRequest";
import { useState } from "react";
import { ROUTES } from "../../../constants/routes/routes";
import { useNavigate } from "react-router-dom";
import RegisterRequest from "../../../api/requests/registerRequest";

export default function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<RegisterTypeRequest>({
    resolver: zodResolver(RegisterSchemaRequest),
  });
  const onSubmit: SubmitHandler<RegisterTypeRequest> = (data) => {
    RegisterRequest({
      email: data.email,
      password: data.password,
      name: data.name,
      lastName: data.lastName,
      document: data.document,
    })
      .then(() => {
        setSuccessMessage(true);
        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 3000);
      })
      .catch(() => {
        setError("email", {
          type: "manual",
          message: "Email já cadastrado!",
        });
      });
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
        {successMessage && (
          <Typography
            component="p"
            variant="subtitle1"
            sx={{
              color: "success.main",
              textAlign: "center",
            }}
          >
            Registro efetuado!
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
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
          <TextField
            margin="normal"
            fullWidth
            label="Nome"
            id="name"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Sobrenome"
            id="lastName"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Documento"
            id="document"
            error={!!errors.document}
            helperText={errors.document?.message}
            {...register("document")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Voltar para págino de acesso."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
