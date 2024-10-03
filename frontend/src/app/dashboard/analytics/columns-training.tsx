"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TrainingDetails = {
  trainingId: number; // Use 'number' instead of 'Number' for primitive types
  trainingName: string; // Use 'string' instead of 'String' for primitive types
  description: string;
  designation: string;
  domainName: string;
  duration: number;
  startDate: Date; // Ensure 'startDate' is a Date object
};
const options:any = { year: 'numeric', month: 'long', day: 'numeric' };

export const columns_training: ColumnDef<TrainingDetails>[] = [
  {
    accessorKey: "trainingId",
    header: "Training Id",
  },
  {
    accessorKey: "trainingName",
    header: "Training Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "domainName",
    header: "Domain Name",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ getValue }) => {
      const date = getValue() as Date; 
      return date ? new Date(date).toLocaleDateString(undefined, options) : "N/A"; 
    },
  },
];
