"use client"

import { ColumnDef } from "@tanstack/react-table"

export type EmployeeDetails = {
  userId:Number,
  userName:String,
  email:String,
  designation:String,
  gender:String
}

export const columns: ColumnDef<EmployeeDetails>[] = [
  {
    accessorKey:"userId",
    header:"Employee Id"
  },
  {
    accessorKey:"userName",
    header:"Employee Name"
  },
  {
    accessorKey:"email",
    header:"Email"
  },
  {
    accessorKey:"designation",
    header:"Designation"
  },
  {
    accessorKey:"gender",
    header:"Gender"
  }
]
