"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Trainings {
  trainingName: string;
  description: string;
  domainNmae: string;
  duration: number;
  responseId: number;
  userId: number;
  trainingId: number;
  score: number;
  responseDate: string;
}

function TrainingAttended() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const userId = user.userId;
  //   console.log(userId);

  const [trainingParticipatedDetails, setTrainingParticipatedDetails] =
    useState<Trainings[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchTrainingDetail = async () => {
      try {
        const response = await axios.get(`/api/trainingAttended/${userId}`);
        // console.log(response.data.data);
        setTrainingParticipatedDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrainingDetail();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="mt-4 w-[1200px]">
      <h1 className="text-lg font-bold mt-8">
        List of all the Trainings Attended
      </h1>
      <DataTable columns={columns} data={trainingParticipatedDetails} />
    </div>
  );
}

export default TrainingAttended;
