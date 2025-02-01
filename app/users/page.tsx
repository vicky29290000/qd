import { UserList } from "@/components/user-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button asChild>
          <Link href="/users/new">New User</Link>
        </Button>
      </div>
      <UserList />
    </div>
  )
}

