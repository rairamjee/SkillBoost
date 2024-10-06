"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TrainingDetails = {
  trainingName: string;
  description: string;
  domainNmae: string;
  duration: number;
  responseId: number;
  userId: number;
  trainingId: number;
  score: number;
  responseDate: string;
};

const options: any = { year: "numeric", month: "long", day: "numeric" };

export const columns: ColumnDef<TrainingDetails>[] = [
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
    accessorKey: "domainName", // Fixed typo from 'domainNmae'
    header: "Domain Name",
  },
  {
    accessorKey: "duration",
    header: "Duration (hours)",
  },
  {
    accessorKey: "responseId",
    header: "Response Id",
  },
  {
    accessorKey: "userId",
    header: "User Id",
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
