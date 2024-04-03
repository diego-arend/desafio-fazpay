import "@testing-library/jest-dom";
import { cleanup, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { api } from "../../../../api";
import GeneralRenderContexts from "../../../GeneralProviderContexts";
import EditProducts from "../../../../pages/private/app/edit";
import { act } from "react-dom/test-utils";
import endpoints from "../../../../constants/endpoints/endpoints";

//Configs teste
export const apiMock = new MockAdapter(api);

describe("List Page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("render the edit page", async () => {
    localStorage.setItem(
      "products_list",
      JSON.stringify([
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 110 },
        { id: 3, name: "Product 3", price: 120 },
      ])
    );
    apiMock
      .onGet(endpoints.product_list_ById.replace(":id", "3"))
      .reply(200, [{ id: 1, name: "Product 1", price: 100 }]);

    await act(async () => {
      GeneralRenderContexts(<EditProducts />);
    });

    expect(
      screen.getByRole("heading", {
        name: /editar produto/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /nome/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /valor/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /editar/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /voltar/i,
      })
    ).toBeInTheDocument();
  });
});
