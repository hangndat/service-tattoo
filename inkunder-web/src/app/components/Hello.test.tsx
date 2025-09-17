import { render, screen } from "@testing-library/react";

import Hello from "./Hello";

describe("Hello component", () => {
  it("renders greeting", () => {
    render(<Hello name="Ink Under Skin" />);
    expect(screen.getByRole("heading", { name: /xin chào, ink under skin!/i })).toBeInTheDocument();
  });
});
