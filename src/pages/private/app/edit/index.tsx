import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes/routes";
import { useEffect, useState } from "react";
import { ProductEntity } from "../../../../types/entites/productEntity";
import { editSchemaProduct } from "../../../../schemas/pages/private/editSchemaProduct";
import { EditProductEntityType } from "../../../../types/entites/editProductEntity";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatBRLCurrency } from "../../../../utils/formatCurrency";
import { SubmitHandler, useForm } from "react-hook-form";
import GetProductByIdRequest from "../../../../api/requests/getProductByIdRequest";
import EditProductByIdRequest from "../../../../api/requests/editProductByIdRequest";

export default function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState<ProductEntity | null>(null);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductEntityType>({
    resolver: zodResolver(editSchemaProduct),
  });

  const onSubmit: SubmitHandler<EditProductEntityType> = (data) => {
    const editedProduct: ProductEntity = {
      ...dataProduct,
      ...(data as unknown as ProductEntity),
      price: Number(data.price.replace(/\D/g, "")),
    };

    EditProductByIdRequest(editedProduct).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    GetProductByIdRequest(id!).then((response) => {
      const product = response.data;
      setDataProduct({
        ...product,
        price: formatBRLCurrency(product.price),
      });

      Object.entries(product).forEach(([key, value]) => {
        if (key === "price") {
          setValue(key, formatBRLCurrency(value as number));
        } else {
          setValue(key as "name", value as string);
        }
      });
    });
  }, [id, setValue]);

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
        <Typography component="h1" variant="h5">
          Editar Produto
        </Typography>
        {/* {successMessage && (
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
        )} */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="nome"
            label="nome"
            autoComplete="name"
            autoFocus
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Valor"
            type="price"
            id="price"
            autoComplete="price"
            error={!!errors.price}
            helperText={errors.price?.message}
            {...register("price")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Editar
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(ROUTES.LIST)}
          >
            Voltar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
