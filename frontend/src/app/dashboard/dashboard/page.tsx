"use client";

import { useEffect, useState } from "react";
import cardlist from "../(menu)/cardlist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Retention from "./retention";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import Report from "../report/page";

const LIMIT = 10;

ChartJS.register(Title, Tooltip, Legend, ArcElement);
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  fetch: (currentPage: number, limit: number) => void;
}

const Overview = () => {
  interface User {
    name: string; // User's name
    email: string; // User's email
    role: string; // User's role
    designation: string; // User's designation
    gender: string; // User's gender
  }

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [showReport, setShowReport] = useState<boolean>(false);

  const fetchUserData = async (currentPage: number, limit: number) => {
    const response = await axios.get(
      `/api/user?page=${currentPage}&limit=${LIMIT}`
    );
    setCurrentPage(response.data.currentPage);
    setTotalPage(response.data.totalPage);
    setAllUsers(response.data.users);
  };

  const handleClickReport = () => {
    setShowReport(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData(currentPage, LIMIT); // Updating the Users list
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const genderCounts = allUsers.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieDataGender = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        label: "Gender Ratio",
        data: Object.values(genderCounts),
        backgroundColor: ["#00072D", "#324A5F"],
      },
    ],
  };

  const designationCounts = allUsers.reduce((acc, user) => {
    acc[user.designation] = (acc[user.designation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieDataDesignation = {
    labels: Object.keys(designationCounts),
    datasets: [
      {
        label: "Designation Distribution",
        data: Object.values(designationCounts),
        backgroundColor: [
          "#2F3E46", // Dark Slate
          "#4C565B", // Slate Shade 1
          "#B3C7C9", // Slate Shade 2
          "#A2C2C9", // Slate Shade 3
          "#B7E0E6", // Slate Shade 4
          "#D9F1F2", // Slate Shade 5
          "#E0F7F8", // Slate Shade 6
          "#F1FBFC", // Slate Shade 7
          "#F7FAFA",
        ], // Add more colors if needed
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cardlist.map((item, index) => (
          <Card key={index} className="h-36">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                {item.title}
              </CardTitle>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mt-8">+ {item.value}</div>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-row">
          <Card className="mr-4">
            <CardHeader style={{ width: "685px" }}>
              <CardTitle>Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {allUsers.map((user, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={`/profile.jpg?height=32&width=32`}
                      alt={user.name}
                      className="w-9 h-9 rounded-full mr-2"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.designation}
                      </div>
                    </div>
                    <div className="ml-72">
                      <Button className="w-32" onClick={handleClickReport}>
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={setCurrentPage}
              fetch={fetchUserData}
            />
          </Card>

          <div className="flex flex-col">
            <div className="flex flex-row">
              <Card style={{ width: "329px", height: "400px" }}>
                <CardHeader>
                  <CardTitle>Gender Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pie data={pieDataGender} />
                </CardContent>
              </Card>

              <Card
                style={{ width: "329px", height: "400px" }}
                className="ml-4"
              >
                <CardHeader>
                  <CardTitle>Designation Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pie data={pieDataDesignation} />
                </CardContent>
              </Card>
            </div>

            <div
              style={{ width: "670px" }}
              className="mt-4 bg-white p-12 rounded-sm"
            >
              <Retention />
            </div>
          </div>
        </div>
      </div>
      {/* {showReport && <Report/>} */}
    </div>
  );
};

export default Overview;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  fetch,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          variant={currentPage === index + 1 ? "default" : "outline"}
          onClick={async () => await fetch(index + 1, LIMIT)}
          aria-label={`Page ${index + 1}`}
          aria-current={currentPage === index + 1 ? "page" : undefined}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
