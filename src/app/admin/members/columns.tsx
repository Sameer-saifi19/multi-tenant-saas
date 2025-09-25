"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Members = {
  profileImage: string
  name: string
  email: string
  phone: string
  joindate: Date | string
  status: "ACTIVE" | "INACTIVE" 
}

export const columns: ColumnDef<Members>[] = [
  {
    accessorKey: "profileImage",
    header: "Profile",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "joindate",
    header: "Joined on",
  },
  {
    accessorKey: "status",
    header: "Status"
  }
]