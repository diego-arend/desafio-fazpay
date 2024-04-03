import "@testing-library/jest-dom";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LoginPage from "../../../pages/public/loginPage";
import GeneralRenderContexts from "../../GeneralProviderContexts";
import { ROUTES } from "../../../constants/routes/routes";
import LoginRequest from "../../../api/requests/loginRequest";

//Configs teste
jest.mock("../../../api/requests/loginRequest.ts");

describe("Login Page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("Login Page render and change route link", async () => {
    act(() => {
      GeneralRenderContexts(<LoginPage />);
    });

    expect(screen.getByTestId("LockOutlinedIcon")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /acessar/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByTestId("login-email")).toBeInTheDocument();
    expect(screen.getByTestId("login-password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /acessar/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /registre-se aqui!/i,
      })
    ).toBeInTheDocument();

    const registerLink = screen.getByRole("link", {
      name: /registre-se aqui!/i,
    });

    fireEvent.click(registerLink);

    act(() => {
      waitFor(() => {
        expect(window.location.pathname).toBe(ROUTES.REGISTER);
      });
    });
  });

  test("Login Page login", async () => {
    act(() => {
      GeneralRenderContexts(<LoginPage />);
    });

    (LoginRequest as jest.Mock).mockResolvedValue({
      data: {
        token: "token",
        user: {
          id: 1,
          name: "usuario",
          email: "test@example.com",
          lastName: "de teste",
        },
      },
    });

    const emailInput = screen.getByTestId("login-email");
    const passwordInput = screen.getByTestId("login-password");
    const submitButton = screen.getByRole("button", {
      name: /acessar/i,
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await act(async () => {
      jest.advanceTimersByTime(200);

      await waitFor(() => {
        expect(window.location.pathname).toBe(ROUTES.LIST);
      });
    });

    expect(window.location.pathname).toBe(ROUTES.LIST);
  });
});
