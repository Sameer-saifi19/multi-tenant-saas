import { useQueryData } from "@/hooks/useQueryData";
import { columns, type Members } from "./columns";
import { DataTable } from "./dataTable";
import { getAllMembers } from "@/actions/members";
import { JSX } from "react";


export default async function Members(gymId: string): Promise<JSX.Element> {
  const { data } = useQueryData(["members"], () => getAllMembers(gymId));
  console.log(data)
  return (
    <div>
      hello
    </div>
  );
}
