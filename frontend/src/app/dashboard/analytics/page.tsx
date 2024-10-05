import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeAnalytics from "./employeeAnalytics";
import TrainingAnalytics from "./trainingAnalytics";

function Analytics() {
  return (
    <Tabs defaultValue="trainings" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="trainings">Trainings</TabsTrigger>
        <TabsTrigger value="employee">Employees</TabsTrigger>
      </TabsList>
      <TabsContent value="trainings">
        <TrainingAnalytics />
      </TabsContent>
      <TabsContent value="employee">
        <EmployeeAnalytics />
      </TabsContent>
    </Tabs>
  );
}

export default Analytics;
