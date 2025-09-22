"use client";
import {
  DashboardOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const items = [
  { key: "/admin", icon: <DashboardOutlined />, label: <Link href="/admin">Dashboard</Link> },
  {
    key: "/admin/posts",
    icon: <FileTextOutlined />,
    label: <Link href="/admin/posts">Bài viết</Link>,
  },
  {
    key: "/admin/settings",
    icon: <SettingOutlined />,
    label: <Link href="/admin/settings">Cài đặt</Link>,
  },
  {
    key: "/admin/create",
    icon: <PlusOutlined />,
    label: <Link href="/admin/create">Tạo mới</Link>,
  },
  { key: "/admin/edit", icon: <EditOutlined />, label: <Link href="/admin/edit">Chỉnh sửa</Link> },
];

export default function AppSider() {
  const pathname = usePathname();
  const selectedKeys = items
    .map((i) => i.key)
    .filter((k) => pathname === k || pathname.startsWith(k + "/"));
  return (
    <Sider breakpoint="lg" collapsible>
      <div className="text-white font-semibold px-4 py-3">Ink Under Admin</div>
      <Menu theme="dark" mode="inline" items={items} selectedKeys={selectedKeys} />
    </Sider>
  );
}
