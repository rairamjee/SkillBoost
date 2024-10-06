"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TrainingDetails = {
  trainingId: number; 
  trainingName: string; 
  description: string;
  designation: string;
  domainName: string;
  duration: number;
  startDate: Date; 
};
const options: any = { year: "numeric", month: "long", day: "numeric" };

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
      return date
        ? new Date(date).toLocaleDateString(undefined, options)
        : "N/A";
    },
  },
];
