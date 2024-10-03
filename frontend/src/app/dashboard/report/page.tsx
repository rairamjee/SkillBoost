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
import { SquarePen, Briefcase, Mail, TrendingUp, UserCircle, Users } from "lucide-react";
import { Avatar } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
          // <div className="mb-4 p-4 border rounded-lg shadow w-[600px] mr-8 bg-white">
          //   <h2 className="text-2xl font-semibold mt-2 mb-4">Employee Details</h2>
          //   <p className="mb-12">
          //     <strong>Name:</strong> {employeeDetail.userName}
          //   </p>
          //   <p>
          //     <strong>Email:</strong> {employeeDetail.email}
          //   </p>
          //   <p>
          //     <strong>Role:</strong> {employeeDetail.role}
          //   </p>
          //   <p>
          //     <strong>Designation:</strong> {employeeDetail.designation}
          //   </p>
          //   <p>
          //     <strong>Gender:</strong> {employeeDetail.gender}
          //   </p>
          // </div>
          <Card className="w-[685px] overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground pb-4">
              <div className="flex items-center gap-8">
                <Avatar className="h-20 w-20 border-2 border-primary-foreground">
                  <AvatarImage alt={`${name}'s avatar`} src="/profile.jpg?height=80&width=80" className="object-cover" />
                  <AvatarFallback className="text-xl font-semibold"></AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{employeeDetail.userName}</CardTitle>
                  {/* <Badge className="mt-1 text-primary-foreground bg-primary-foreground/20">
                    {employeeDetail.designation}
                  </Badge> */}
                  <CardTitle className="text-sm">{employeeDetail.designation}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{employeeDetail.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{employeeDetail.role}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{employeeDetail.designation}</span>
              </div>
              <div className="flex items-center gap-3">
                <UserCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{employeeDetail.gender}</span>
              </div>
              <div className="flex items-center gap-3">
                <SquarePen className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{employeeReportDetails.length}</span>
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="ml-4">
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
