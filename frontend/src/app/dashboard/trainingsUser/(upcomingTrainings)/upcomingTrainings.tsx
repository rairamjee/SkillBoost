"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface TrainingDetails {
  trainingId: number;
  trainingName: string;
  description: string;
  domainName: string;
  duration: number;
  startDate: Date;
}
function UpComingTrainings() {
  const [upComingTrainingDetails, setUpcomingTrainingsDetails] = useState<
    TrainingDetails[]
  >([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchUpcomingTrainingsDeatils = async () => {
      try {
        const response = await axios.get("/api/upComingTrainings");
        // console.log(response.data.data);
        setUpcomingTrainingsDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error :", error);
      }
    };
    fetchUpcomingTrainingsDeatils();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="mt-4 w-[1200px]">
      <h1 className="text-lg font-bold mt-8">
        List of all the Upcoming Trainings
      </h1>
      <DataTable columns={columns} data={upComingTrainingDetails} />
    </div>
  );
}

export default UpComingTrainings;
