import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import TrainingAttended from "./(trainingAttended)/trainingAttended";
import UpcomingTrainings from "./(upcomingTrainings)/upcomingTrainings";

function Trainings() {
  return (
    <Tabs defaultValue="upcomingTraining" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="upcomingTraining">Upcoming Trainings</TabsTrigger>
        <TabsTrigger value="trainingAttended">Trainings Attended</TabsTrigger>
      </TabsList>
      <TabsContent value="upcomingTraining">
        <h1 className="text-lg font-bold ml-4 mt-8">
          List of all the Upcoming Trainings
        </h1>
        <div className="ml-4">
          <UpcomingTrainings />
        </div>
      </TabsContent>
      <TabsContent value="trainingAttended">
        <div className="ml-4">
          <TrainingAttended />
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default Trainings;
