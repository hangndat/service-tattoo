"use client";
import {
  DashboardOutlined,
  AccountBookOutlined,
  TeamOutlined,
  ProductOutlined,
  FileDoneOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const items = [
  { key: "/admin", icon: <DashboardOutlined />, label: <Link href="/admin">Dashboard</Link> },
  {
    key: "/admin/artists",
    icon: <TeamOutlined />,
    label: <Link href="/admin/artists">Artists</Link>,
  },

  {
    key: "/admin/porfolio",
    icon: <FileDoneOutlined />,
    label: <Link href="/admin/porfolio">Porfolio</Link>,
  },

  {
    key: "/admin/products",
    icon: <ProductOutlined />,
    label: <Link href="/admin/products">Products</Link>,
  },

  {
    key: "/admin/bookings",
    icon: <AccountBookOutlined />,
    label: <Link href="/admin/bookings">Booking</Link>
  },

  {
    key: "/admin/analytics",
    icon: <BarChartOutlined />,
    label: <Link href="/admin/analytics">Analytics</Link>
  },
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
