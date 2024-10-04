"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  CartesianGrid,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function Report(empId: any) {
  interface Report {
    responseId: number;
    userId: number;
    trainingId: number;
    score: number;
    responseDate: string; // Use string for ISO date format
  }

  interface Employee {
    userId: number;
    userName: string;
    email: string;
    role: string;
    designation: string;
    gender: string;
  }

  const [employeeReportDetails, setEmployeeReportDetails] = useState<Report[]>(
    []
  );
  const [employeeDetail, setEmployeeDetail] = useState<Employee>();
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const employeeId: number = empId.empId;

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`/api/employeeDetails/${employeeId}`);
        setEmployeeReportDetails(response.data.data.responses || []);
        setEmployeeDetail(response.data.data.user || []);
        console.log(response.data.data.user);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchEmployeeDetails();
  }, [employeeId]);

  const chartData = employeeReportDetails.map((report) => ({
    trainingId: report.trainingId,
    score: report.score,
  }));

  if (loading) {
    return <div>Loading...</div>; // Loading message or spinner
  }

  return (
    <div className="w-full">
      <div className="flex gap-5 mt-8">
        <h1 className=" text-2xl mb-8">Employee Report </h1>
        <TrendingUp className="mt-1" />
      </div>
      {employeeDetail && (
        <div className="flex gap-8 flex-row items-center">
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  className="font-semibold text-base border-slate-600 bg-white"
                >
                  Detailed Report of {employeeDetail.userName}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4 ml-24">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      @{employeeDetail.designation}
                    </h4>
                    <p className="text-sm">
                      The role of the person is {employeeDetail.role}. Contact
                      at <u className="font-bold">{employeeDetail.email}</u>.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      )}

      <div className="flex gap-8 mt-8">
        <div className="mt-4 w-[650px]">
          <DataTable columns={columns} data={employeeReportDetails} />
        </div>

        <Card className="ml-0 mt-4 w-1/2 bg-transparent border-none">
          <CardHeader>
            <CardTitle>Scores in Training</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              width={600}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="trainingId">
                <Label value="Training ID" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label
                  value="Score"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Bar dataKey="score" fill="slate" />
            </BarChart>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm ">
            <div className="flex gap-2 font-medium leading-none ">
              Scores as per training <TrendingUp className="h-4 w-4 " />
            </div>
            <div className="leading-none text-muted-foreground ">
              Participate in More trainings
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Report;
