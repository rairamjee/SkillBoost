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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

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
  const [isLoading, setIsLoading] = useState<Boolean>(true);

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

    fetchDetail();
  }, [employeeId]);

  const chartData = employeeReportDetails.map((report) => ({
    trainingId: report.trainingId,
    score: report.score,
  }));

  // Prepare data for the radar chart
  const radarData = [
    {
      category: "Very Poor",
      value: employeeReportDetails.filter((r) => r.score <= 25).length,
    },
    {
      category: "Poor",
      value: employeeReportDetails.filter((r) => r.score > 25 && r.score <= 50)
        .length,
    },
    {
      category: "Average",
      value: employeeReportDetails.filter((r) => r.score > 50 && r.score <= 75)
        .length,
    },
    {
      category: "Good",
      value: employeeReportDetails.filter((r) => r.score > 75 && r.score <= 89)
        .length,
    },
    {
      category: "Excellent",
      value: employeeReportDetails.filter((r) => r.score > 89).length,
    },
  ];

  const progressChartData = employeeReportDetails.map((report): { date: string; score: number } => {
    const date = new Date(report.responseDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1
    return {
      date: `${year}-${month}`, // Format: "YYYY-MM"
      score: report.score,
    };
  });
  
  // Sort the data by date
  progressChartData.sort((a, b) => {
    const dateA = new Date(`${a.date}-01`);
    const dateB = new Date(`${b.date}-01`); 
    return dateA.getTime() - dateB.getTime(); 
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col">
        <p className="mt-8 font-bold ml-6 text-xl">Performance Graphs</p>
        <div className="flex gap-4">
        <Card className="bg-transparent border-none w-[400px] h-[400px]">
            <CardHeader>
              <CardTitle className="text-base font-bold">Marks Distribution by Category</CardTitle>
              <CardDescription>
                Areas of performance 
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChart
                outerRadius={90}
                width={400}
                height={250}
                data={radarData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <Radar
                  name="Scores"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none w-[550px] h-[400px]">
            <CardHeader>
              <CardTitle className="text-base font-bold">Marks Scored in Trainings</CardTitle>
              <CardDescription>
                Progress Report Based on your Performance in Each Training
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                width={500}
                height={300}
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="trainingId"
                  label={{
                    value: "Training ID",
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis
                  dataKey="score"
                  label={{
                    value: "Scores",
                    position: "insideLeft",
                    angle: -90,
                  }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="url(#colorScore)"
                />
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#304159" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </CardContent>
          </Card> 

          <Card className="bg-transparent border-none w-[550px] h-[400px]">
            <CardHeader>
              <CardTitle className="text-base font-bold">Marks Scored in Trainings</CardTitle>
              <CardDescription>
                Progress Report Based on your Performance in Each Training
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                width={500}
                height={300}
                data={progressChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  label={{
                    value: "Date",
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis
                  dataKey="score"
                  label={{
                    value: "Scores",
                    position: "insideLeft",
                    angle: -90,
                  }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="url(#colorScore)"
                />
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#304159" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
        <p className="mt-8 font-bold ml-6 text-xl">Performance Table</p>
        <div className="flex gap-4">
        <Table className="mt-4 w-[1200px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-base">
                Response Id
              </TableHead>
              <TableHead className="text-center text-base">
                Training Id
              </TableHead>
              <TableHead className="base text-center">Score</TableHead>
              <TableHead className="text-center text-base">
                Response Day
              </TableHead>
              <TableHead className="text-center text-base">
                Response Month
              </TableHead>
              <TableHead className="text-center text-base">
                Response Year
              </TableHead>
              <TableHead className="base text-center w-[150px]">
                Tag Earned
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeReportDetails.map((report) => (
              <TableRow key={report.responseId}>
                <TableCell className="text-center">
                  {report.responseId}
                </TableCell>
                <TableCell className="text-center">
                  {report.trainingId}
                </TableCell>
                <TableCell className="text-center">{report.score}</TableCell>
                <TableCell className="text-center">
                  {new Date(report.responseDate).toDateString().split(" ")[0]}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(report.responseDate).toDateString().split(" ")[1]}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(report.responseDate).toDateString().split(" ")[3]}
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  {report.score >= 0 && report.score <= 25 ? (
                    <Badge className="bg-red-500 w-20 h-6 flex justify-center items-center">
                      Very Poor
                    </Badge>
                  ) : report.score > 25 && report.score <= 50 ? (
                    <Badge className="bg-orange-500 w-20 h-6 flex justify-center items-center">
                      Poor
                    </Badge>
                  ) : report.score > 50 && report.score <= 75 ? (
                    <Badge className="bg-yellow-500 w-20 h-6 flex justify-center items-center">
                      Average
                    </Badge>
                  ) : report.score > 75 && report.score <= 89 ? (
                    <Badge className="bg-purple-500 w-20 h-6 flex justify-center items-center">
                      Good
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 w-20 h-6 flex justify-center items-center">
                      Excellent
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default UserReport;
