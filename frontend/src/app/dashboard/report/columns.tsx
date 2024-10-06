"use client";

import { ColumnDef } from "@tanstack/react-table";

export type EmployeeDetails = {
  responseId: number;
  trainingId: number;
  score: number;
  responseDate: string;
};
const options: any = { year: "numeric", month: "long", day: "numeric" };

export const columns: ColumnDef<EmployeeDetails>[] = [
  {
    accessorKey: "responseId",
    header: "Response Id",
  },
  {
    accessorKey: "trainingId",
    header: "Training Id",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "responseDate",
    header: "Response Date",
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return date
        ? new Date(date).toLocaleDateString(undefined, options)
        : "N/A";
    },
  },
];
