"use client";

import { getAllMembers } from "@/actions/members";
import { columns, type Members } from "@/components/global/memberTable/columns";
import { DataTable } from "@/components/global/memberTable/dataTable";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function MembersPage() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-members"],
    queryFn: () => getAllMembers(),
  });

  const pathname = usePathname()

  const tableData: Members[] = data?.data ?? [];

  if (isLoading) return <h1>Loading</h1>;

  if (isError)
    return (
      <h1 className="text-xl text-red-600">Error ! Something went wrong</h1>
    );

  return (
    <div>
      <div className="flex items-center mt-4 justify-between">
        <h1 className="text-2xl font-semibold">Members</h1>
        <Link className="mr-8" href={`${pathname}/create-member`}>Add Member</Link>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
