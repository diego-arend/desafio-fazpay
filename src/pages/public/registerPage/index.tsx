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

export default function RegisterPage() {
  //   const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterTypeRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchemaRequest),
  });

  const onSubmit: SubmitHandler<RegisterTypeRequest> = (data) => {
    console.log("debug onSubmit Register", {
      email: data.email,
      password: data.password,
      name: data.name,
      lastName: data.lastName,
      document: data.document,
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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
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
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            id="name"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Sobrenome"
            id="lastName"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName")}
          />
          <TextField
            margin="normal"
            required
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
              <Link href="/login" variant="body2">
                {"Voltar para págino de acesso."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
