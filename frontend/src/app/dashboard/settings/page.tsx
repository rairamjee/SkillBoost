import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Settings() {
  return (
    <Tabs defaultValue="trainings" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="trainings">Trainings</TabsTrigger>
    <TabsTrigger value="employee">Employees</TabsTrigger>
  </TabsList>
  <TabsContent value="trainings">
    Some Basic settings Related to Trainings 
  </TabsContent>
  <TabsContent value="employee">
    Some Basic settings Related to Employees
  </TabsContent>
</Tabs>

  )
}

export default Settings