// src/components/admin/AppSider.test.tsx
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
  vi.resetModules();
});

describe("AppSider", () => {
  it("chọn đúng mục theo đường hiện tại", async () => {
    mockUsePathname("/admin"); // 1) mock trước
    const { default: AppSider } = await import("@/components/admin/AppSider"); // 2) rồi mới import component
    await act(async () => {
      render(<AppSider />);
    });
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
