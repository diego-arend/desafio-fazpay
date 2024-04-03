import "@testing-library/jest-dom";
import { cleanup, screen, waitFor } from "@testing-library/react";
import ListProducts from "../../../../pages/private/app/list";
import GeneralRenderContexts from "../../../GeneralProviderContexts";
import { act } from "react-dom/test-utils";
import { api } from "../../../../api";
import MockAdapter from "axios-mock-adapter";
import endpoints from "../../../../constants/endpoints/endpoints";

//Configs teste
export const apiMock = new MockAdapter(api);

describe("List Page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("render the list page component", async () => {
    apiMock.onGet(endpoints.product_list).reply(200, [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 110 },
      { id: 3, name: "Product 3", price: 120 },
    ]);

    await act(async () => {
      GeneralRenderContexts(<ListProducts />);
    });

    await act(async () => {
      await waitFor(() => {
        screen.getByTestId("id-product-name-Product 1");
      });
    });

    expect(screen.getByText(/lista de produtos/i)).toBeInTheDocument();
    expect(screen.getByTestId("id-product-name-Product 1")).toBeInTheDocument();
    expect(screen.getByTestId("id-product-name-Product 2")).toBeInTheDocument();
    expect(screen.getByTestId("id-product-name-Product 3")).toBeInTheDocument();
    expect(screen.getByTestId("edit-product-button-3")).toBeInTheDocument();
  });
});
