import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewTrainings from "./newTrainings";
import AddEmployee from "./newEmployee";
import UploadMarks from "./uploadMarks";

function AddNew() {
  return (
    <Tabs defaultValue="trainings" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="trainings">Add Trainings</TabsTrigger>
        <TabsTrigger value="employee">Add Employees</TabsTrigger>
        <TabsTrigger value="marks">Add Marks</TabsTrigger>
      </TabsList>
      <TabsContent value="trainings">
        <NewTrainings />
      </TabsContent>
      <TabsContent value="employee">
        <AddEmployee />
      </TabsContent>
      <TabsContent value="marks">
        <UploadMarks/>
      </TabsContent>
    </Tabs>
  );
}

export default AddNew;
