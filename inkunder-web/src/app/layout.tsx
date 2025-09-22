import "antd/dist/reset.css"; // luôn trước globals
import "./globals.css";

export const metadata = {
  title: "Ink Under Skin",
  description: "Tattoo studio Q3, HCM",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
