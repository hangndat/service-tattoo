// src/components/admin/AppBreadcrumb.test.tsx
import { render, screen } from "@testing-library/react";
import { LinkProps } from "next/link";
import { ReactNode } from "react";
import { act } from "react";

import { mockUsePathname } from "@/test/utils/mockNextNavigation";
vi.mock("next/link", () => ({
  default: ({ href, children }: LinkProps & { children: ReactNode }) => (
    <a href={typeof href === "string" ? href : String(href)}>{children}</a>
  ),
}));

beforeEach(() => {
  vi.resetModules(); // clear module cache để mock có hiệu lực
});

describe("AppBreadcrumb", () => {
  it("tạo breadcrumb đúng theo đường hiện tại", async () => {
    mockUsePathname("/admin/porfolio"); // 1) mock trước
    const { default: AppBreadcrumb } = await import("@/components/admin/AppBreadcrumb"); // 2) rồi mới import component
    await act(async () => {
      render(<AppBreadcrumb />);
    });


    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("porfolio")).toBeInTheDocument();
  });
});
