import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">ConstructPro</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/dashboard" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/projects"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/projects") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Projects
        </Link>
        <Link
          href="/designs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/designs") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Designs
        </Link>
        <Link
          href="/users"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/users") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Users
        </Link>
      </nav>
    </div>
  )
}

