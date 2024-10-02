// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function Settings() {
  return (
//     <Tabs defaultValue="trainings" className="w-[400px]">
//   <TabsList>
//     <TabsTrigger value="trainings">Trainings</TabsTrigger>
//     <TabsTrigger value="employee">Employees</TabsTrigger>
//   </TabsList>
//   <TabsContent value="trainings">
//     Some Basic settings Related to Trainings 
//   </TabsContent>
//   <TabsContent value="employee">
//     Some Basic settings Related to Employees
//   </TabsContent>
// </Tabs>


    
<div className="ml-4">
  <h1 className="text-2xl font-bold">Settings</h1> 
  <Accordion type="single" collapsible className="w-1/3 mt-8">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">General</AccordionTrigger>
        <AccordionContent className="">
          General Setting one
        </AccordionContent>
        <AccordionContent>
          General Setting two
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-bold">Security</AccordionTrigger>
        <AccordionContent>
         Setting 1
        </AccordionContent>
        <AccordionContent>
         Setting 2
        </AccordionContent>
        <AccordionContent>
         Setting 3
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-bold">Integrations</AccordionTrigger>
        <AccordionContent>
         Setting 1
        </AccordionContent>
        <AccordionContent>
         Setting 2
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="font-bold">Support</AccordionTrigger>
        <AccordionContent>
         Setting 1
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="font-bold">Organisations</AccordionTrigger>
        <AccordionContent>
         Setting 1
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger className="font-bold">Advanced</AccordionTrigger>
        <AccordionContent>
         Setting 1
        </AccordionContent>
        <AccordionContent>
         Setting 2
        </AccordionContent>
        <AccordionContent>
         Setting 3
        </AccordionContent>
      </AccordionItem>
    </Accordion>
</div>
  )
}

export default Settings