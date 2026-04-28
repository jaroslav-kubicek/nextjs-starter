import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("smoke", () => {
  it("renders a shadcn button via RTL", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });
});
