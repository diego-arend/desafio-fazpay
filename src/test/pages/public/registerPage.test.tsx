import "@testing-library/jest-dom";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RegisterPage from "../../../pages/public/registerPage";
import GeneralRenderContexts from "../../GeneralProviderContexts";
import { ROUTES } from "../../../constants/routes/routes";

describe("Register Page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("render register page and change route login", async () => {
    act(() => {
      GeneralRenderContexts(<RegisterPage />);
    });

    expect(
      screen.getByRole("heading", {
        name: /registrar/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /email/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /primeiro nome/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /sobrenome/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /documento/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /registrar/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /voltar para págino de acesso\./i,
      })
    ).toBeInTheDocument();

    const loginLink = screen.getByRole("link", {
      name: /voltar para págino de acesso\./i,
    });

    fireEvent.click(loginLink);

    waitFor(() => {
      expect(window.location.pathname).toBe(ROUTES.LOGIN);
    });

    expect(window.location.pathname).toBe(ROUTES.LOGIN);
  });

  test("render register user ", async () => {
    act(() => {
      GeneralRenderContexts(<RegisterPage />);
    });

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/senha/i);
    const nameInput = screen.getByRole("textbox", {
      name: /primeiro nome/i,
    });
    const lastNameInput = screen.getByRole("textbox", {
      name: /sobrenome/i,
    });
    const documentInput = screen.getByRole("textbox", {
      name: /documento/i,
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(nameInput, { target: { value: "Testador" } });
    fireEvent.change(lastNameInput, { target: { value: "de Tudo" } });
    fireEvent.change(documentInput, { target: { value: "396.167.720-40" } });

    await act(async () => {
      jest.advanceTimersByTime(200);

      await waitFor(() => {
        expect(window.location.pathname).toBe(ROUTES.LOGIN);
      });
    });

    expect(window.location.pathname).toBe(ROUTES.LOGIN);
  });
});
