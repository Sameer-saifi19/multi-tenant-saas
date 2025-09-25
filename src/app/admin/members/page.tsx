import { useQueryData } from "@/hooks/useQueryData"
import { columns, type Members } from "./columns"
import { DataTable } from "./dataTable"
import { getAllMembers } from "@/actions/members"

async function getData(): Promise<Members[]> {
  // Fetch data from your API here.
  const {data} = await useQueryData(["members"], getAllMembers)

  return [
    {
      profileImage: "Sameer",
      name: "Sameer Saifi",
      email: "Sameer.edu19@gmail.com",
      phone: "9639927782",
      joindate: new Date().toLocaleDateString(),
      status: "ACTIVE"
    },
    // ...
  ]
}

export default async function Members() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}