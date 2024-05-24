"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Candidate = {
  id: string;
  name: string;
  experience: string;
  address: string | null;
  province: string;
  resume: string;
  status: string;
  //   email: string;
};

export const columns: ColumnDef<Candidate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.getValue("experience")} Years`}</div>
    ),
  },
  {
    accessorKey: "province",
    header: "Province",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("province")}</div>
    ),
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => (
      <a
        href={row.getValue("resume")}
        target="_blank"
        className="underline text-blue-600"
      >
        download
      </a>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn(
            row.getValue("status") === "fresh" && "bg-blue-600/80",
            row.getValue("status") === "interview" && "bg-orange-600/80",
            row.getValue("status") === "selected" && "bg-lime-600/80",
            row.getValue("status") === "rejected" && "bg-red-600/80"
          )}
        >
          {row.getValue("status")}{" "}
        </Badge>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
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
            <DropdownMenuItem>
              <Link href={`/hirings/${data.id}`}>View Candidate</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
