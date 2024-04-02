import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import LoginPage from "../../../pages/public/loginPage";
import GeneralRenderContexts from "../../GeneralProviderContexts";
import { ROUTES } from "../../../constants/routes/routes";

describe("Login Page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("Login Page login", async () => {
    act(() => {
      GeneralRenderContexts(<LoginPage />);
    });

    const emailInput = screen.getByTestId("login-email");
    const passwordInput = screen.getByTestId("login-password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
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

    waitFor(() => {
      expect(window.location.pathname).toBe(ROUTES.REGISTER);
    });
  });
});
