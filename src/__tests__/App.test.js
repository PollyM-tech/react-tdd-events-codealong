// src/__tests__/App.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import "@testing-library/jest-dom";

describe("Pizza Toppings App", () => {
  // Test initial state
  test("renders heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /select pizza toppings/i })
    ).toBeInTheDocument();
  });

  test("pepperoni checkbox is initially unchecked", () => {
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", {
      name: /add pepperoni/i,
    });
    expect(pepperoniCheckbox).not.toBeChecked();
  });

  test("toppings list initially contains only cheese", () => {
    render(<App />);
    const toppingsList = screen.getAllByRole("listitem");
    expect(toppingsList).toHaveLength(1);
    expect(toppingsList[0]).toHaveTextContent("Cheese");
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
  });

  // Test checkbox interaction
  test("checkbox becomes checked when clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", {
      name: /add pepperoni/i,
    });

    await user.click(pepperoniCheckbox);
    expect(pepperoniCheckbox).toBeChecked();
  });

  test("pepperoni appears in toppings list when checked", async () => {
    const user = userEvent.setup();
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", {
      name: /add pepperoni/i,
    });

    await user.click(pepperoniCheckbox);

    const toppingsList = screen.getAllByRole("listitem");
    expect(toppingsList).toHaveLength(2);
    expect(toppingsList[0]).toHaveTextContent("Cheese");
    expect(toppingsList[1]).toHaveTextContent("Pepperoni");
  });

  // Test toggle functionality
  test("pepperoni can be toggled on and off", async () => {
    const user = userEvent.setup();
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", {
      name: /add pepperoni/i,
    });

    // First click - add pepperoni
    await user.click(pepperoniCheckbox);
    expect(pepperoniCheckbox).toBeChecked();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    // Second click - remove pepperoni
    await user.click(pepperoniCheckbox);
    expect(pepperoniCheckbox).not.toBeChecked();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
  });
});
