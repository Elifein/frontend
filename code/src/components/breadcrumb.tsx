import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex overflow-x-auto py-2 px-4 md:px-0 bg-gray-50 md:bg-transparent">
      <ol className="flex items-center space-x-1 whitespace-nowrap">
        <li>
          <Link href="/" className="text-[#1a4e78] hover:underline flex items-center">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
            {item.href ? (
              <Link href={item.href} className="text-[#1a4e78] hover:underline text-sm">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600 text-sm">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
