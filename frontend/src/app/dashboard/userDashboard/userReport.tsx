"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Report {
  responseId: number;
  userId: number;
  trainingId: number;
  score: number;
  responseDate: string;
}

function UserReport() {
  const [employeeReportDetails, setEmployeeReportDetails] = useState<Report[]>(
    []
  );
  const[isLoading,setIsLoading]=useState<Boolean>(true)

  // Parse the user object from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const employeeId = user.userId;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/api/employeeDetails/${employeeId}`);
        setEmployeeReportDetails(response.data.data.responses || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching employee report details:", error);
      }
    };

    // Call the fetchDetail function
    fetchDetail();
  }, [employeeId]); // Add employeeId as a dependency

  if(isLoading){
    return (
        <div>Loading...</div>
    )
  }

  const options: any = { year: "numeric", month: "long", day: "numeric" };
  return (
    <div>
      <p className="mt-8 font-bold ml-4"> Performance Table</p>
      <Table className="w-[700] mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right text-base">Response Id</TableHead>
            <TableHead className="text-right
            text-base">Training Id</TableHead>
            <TableHead className="text-base text-right">Score</TableHead>
            <TableHead className="text-right text-base">
              Response Day
            </TableHead>
            <TableHead className="text-right text-base">
              Response Month
            </TableHead>
            <TableHead className="text-right text-base">
              Response Year
            </TableHead>
            <TableHead className="text-base">Tag Earned</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeReportDetails.map((report) => (
            <TableRow key={report.responseId}>
              <TableCell className="text-center">{report.responseId}</TableCell>
              <TableCell className="text-center">{report.trainingId}</TableCell>
              <TableCell className="text-center">{report.score}</TableCell>
              <TableCell className="text-right">
                {new Date(report.responseDate).toDateString().split(" ")[0]}
              </TableCell>
              <TableCell className="text-right">
                {new Date(report.responseDate).toDateString().split(" ")[1]}
              </TableCell>
              <TableCell className="text-right">
                {new Date(report.responseDate).toDateString().split(" ")[3]}
              </TableCell>
              <TableCell>
                {report.score >= 0 && report.score <= 40 ? (
                  <Badge className="bg-red-500 w-20 h-6 flex justify-center align-middle">
                    Fail
                  </Badge>
                ) : report.score >= 41 && report.score <= 80 ? (
                  <Badge className="bg-yellow-500 w-20 h-6 flex justify-center align-middle">
                    Passed
                  </Badge>
                ) : (
                  <Badge className="bg-green-500 w-20 h-6 flex justify-center align-middle">
                    Excellent
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserReport;
