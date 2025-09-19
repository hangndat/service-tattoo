'use client'
import { Breadcrumb } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"

const labelMap: Record <string, string> = {
  admin: "Admin",
  posts: "Bài viết",
  settings: "Cài đặt",
  create: "Tạo mới",
  edit: "Chỉnh sửa",
}

export default function AppBreadcrumbs () {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const items = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/')
    const title = labelMap[seg] || seg
    const isLast = idx === segments.length - 1
    return { title: isLast ? <span>{title}</span> : <Link href={href}>{title}</Link> }
  })
   return <Breadcrumb items={items} />
}