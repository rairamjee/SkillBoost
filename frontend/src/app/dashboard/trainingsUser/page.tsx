import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import TrainingAttended from "./(trainingAttended)/trainingAttended";
import UpComingTrainings from "./(upComingTrainings)/upComingTrainings";
function Trainings() {
  return (
    <Tabs defaultValue="upcomingTraining" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="upcomingTraining">Upcoming Trainings</TabsTrigger>
        <TabsTrigger value="trainingAttended">Trainings Attended</TabsTrigger>
      </TabsList>
      <TabsContent value="upcomingTraining">
        <div className="ml-4">
          <UpComingTrainings />
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
