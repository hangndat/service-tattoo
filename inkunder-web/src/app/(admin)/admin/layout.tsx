"use client";
import { Layout } from "antd";
import Link from "next/link";

import AppBreadcrumb from "@/components/admin/AppBreadcrumb";
import AppSider from "@/components/admin/AppSider";

const { Header, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <AppSider />
      <Layout>
        <Header style={{ background: "white", borderBottom: "1px solid #eee" }}>
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <div className="font-semibold">Admin</div>
            <Link href="/" className="text-sm underline">
              Về Public
            </Link>
          </div>
        </Header>
        <Content>
          <div className="max-w-6xl mx-auto px-4 py-6">
            <AppBreadcrumb />
            <div className="mt-4">{children}</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
