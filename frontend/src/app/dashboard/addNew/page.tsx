import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewTrainings from "./newTrainings";
import AddEmployee from "./newEmployee";


function AddNew() {
  return (
    <Tabs defaultValue="trainings" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="trainings">Add Trainings</TabsTrigger>
    <TabsTrigger value="employee">Add Employees</TabsTrigger>
  </TabsList>
  <TabsContent value="trainings"><NewTrainings/></TabsContent>
  <TabsContent value="employee"><AddEmployee/></TabsContent>
</Tabs>

  )
}

export default AddNew