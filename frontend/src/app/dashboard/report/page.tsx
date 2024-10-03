"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

  const [employeeReportDetails, setEmployeeReportDetails] = useState<Report[]>([]);
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
      <h1 className="font-bold text-2xl mb-8">Report</h1>
      <div className="flex flex-row">
        {employeeDetail && (
          <div className="mb-4 p-4 border rounded-lg shadow w-[600px] mr-8 bg-white">
            <h2 className="text-2xl font-semibold mt-2 mb-4">Employee Details</h2>
            <p className="mb-12">
              <strong>Name:</strong> {employeeDetail.userName}
            </p>
            <p>
              <strong>Email:</strong> {employeeDetail.email}
            </p>
            <p>
              <strong>Role:</strong> {employeeDetail.role}
            </p>
            <p>
              <strong>Designation:</strong> {employeeDetail.designation}
            </p>
            <p>
              <strong>Gender:</strong> {employeeDetail.gender}
            </p>
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Scores in Training</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              width={600}
              height={200}
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
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Scores as per training <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Participate in More trainings
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Report;
