import { useEffect, useState } from "react";
import ListProductsRequest from "../../../../api/requests/listProductsRequest";
import { ListProductsTypeResponse } from "../../../../types/requests/listProductsTypeResponse";
import {
  Button,
  Container,
  Grid,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes/routes";

export default function ListProducts() {
  const [dataProducts, setDataProducts] =
    useState<ListProductsTypeResponse | null>(null);
    const navigate = useNavigate()

  useEffect(() => {
    ListProductsRequest().then((res) => {
      setDataProducts(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("debug list", dataProducts);

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={12}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Lista de produtos
          </Typography>
          <div>
            <List>
              {dataProducts?.map((product) => (
                <ListItem
                  key={product.id}
                  style={{
                    backgroundColor: "#7575",
                    borderRadius: 10,
                    margin: 2,
                  }}
                  secondaryAction={
                    <Button
                    aria-label="edit-prodct"
                    onClick={
                      () => navigate(ROUTES.EDIT_PRODUCT.replace(':id', String(product.id)))
                    }
                    >
                      <EditIcon />
                    </Button>
                  }
                >
                  <ListItemText
                    primary={
                      <>
                        <Typography>{product.name}</Typography>
                        <Typography>
                          Valor:{" "}
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price / 100)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
