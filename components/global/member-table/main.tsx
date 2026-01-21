import { columns, Member } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  return [
    {
      profile: "728ed52f",
      name: "Sameer Saifi",
      status: "Active",
      phone: "9639927782",
      email: "Sameer@gmail.com",
    },
  ]
}

export default async function MembersTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}