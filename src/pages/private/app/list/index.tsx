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
  const navigate = useNavigate();

  useEffect(() => {
    ListProductsRequest()
      .then((res) => {
        console.log("debug login response", res);
        setDataProducts(res.data);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    <div data-testid={`edit-product-button-${product.id}`}>
                      <Button
                        aria-label="edit-prodct"
                        onClick={() =>
                          navigate(
                            ROUTES.EDIT_PRODUCT.replace(
                              ":id",
                              String(product.id)
                            )
                          )
                        }
                      >
                        <EditIcon />
                      </Button>
                    </div>
                  }
                >
                  <ListItemText
                    primary={
                      <div data-testid={`id-product-name-${product.name}`}>
                        <Typography>{product.name}</Typography>
                      </div>
                    }
                    secondary={
                      <div data-testid={`id-product-price-${product.id}`}>
                        <Typography>
                          Valor:{" "}
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price / 100)}
                        </Typography>
                      </div>
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
