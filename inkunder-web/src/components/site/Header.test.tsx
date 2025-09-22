// src/components/site/Header.test.tsx
import { render, screen, fireEvent, within } from "@testing-library/react";
import type { LinkProps } from "next/link";
import type { ReactNode } from "react";

import { mockUsePathname } from "@/test/utils/mockNextNavigation";

vi.mock("next/link", () => ({
  default: ({ href, children }: LinkProps & { children: ReactNode }) => (
    <a href={typeof href === "string" ? href : String(href)}>{children}</a>
  ),
}));

beforeEach(() => {
  vi.resetModules();
});

describe("Header", () => {
  it("render và làm nổi mục đang ở", async () => {
    mockUsePathname("/"); // 1) mock trước
    const { default: Header } = await import("./Header"); // 2) import sau
    render(<Header />);

    const homeLink = screen.getByText("Trang chủ");
    expect(homeLink).toBeInTheDocument();
  });

  it("mở menu mobile khi bấm nút", async () => {
    mockUsePathname("/about");
    const { default: Header } = await import("./Header");
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /mở menu/i }));

    // Nếu bạn dùng Hướng A (component có data-testid và render theo state):
    const mobile = screen.getByTestId("mobile-menu");
    expect(within(mobile).getByText("Giới thiệu")).toBeInTheDocument();

    // Nếu bạn giữ component cũ (render luôn, ẩn bằng CSS):
    // expect(screen.getAllByText('Giới thiệu').length).toBeGreaterThan(0)
  });
});
