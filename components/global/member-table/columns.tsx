"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BookUser, Delete, DeleteIcon, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Member = {
  profile: string;
  name: string;
  status: "Active" | "Inactive";
  phone: string;
  email: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "profile",
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
    header: "Mobile",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const Member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem> <BookUser/> Member details</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" > <Trash/> Delete Member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
