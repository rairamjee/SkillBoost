import { useEffect, useState } from "react";
import axios from "axios";
import { DataTableTraining } from "./(trainingAnalytics)/data-table-tarining";
import { columns_training } from "./(trainingAnalytics)/columns-training";
function TraingAnalytics() {
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/training");
        console.log(response.data.data);
        setTraining(response.data.data);
      } catch (error) {
        console.log("Error :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //     const formatDate = (dateString:any) => {
  //       const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
  //       return new Date(dateString).toLocaleDateString(undefined, options);
  //   };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="ml-4 mt-8">
      <h1 className="font-bold text-2xl">Training List</h1>
      <div style={{ width: "1000px" }} className="mt-8">
        {/* <Table >
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Training Id</TableHead>
                            <TableHead className="font-bold">Training Name</TableHead>
                            <TableHead className="font-bold">Description</TableHead>
                            <TableHead className="font-bold">Domain</TableHead>
                            <TableHead className="font-bold">Duration</TableHead>
                            <TableHead className="font-bold">Start Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {training.map((training:any) => (
                            <TableRow key={training.trainingId}>
                                <TableCell>{training.trainingId}</TableCell>
                                <TableCell >{training.trainingName}</TableCell>
                                <TableCell>{training.description}</TableCell>
                                <TableCell>{training.domainName}</TableCell>
                                <TableCell >{training.duration}</TableCell>
                                <TableCell>{formatDate(training.startDate)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>

                        </TableRow>
                    </TableBody>
                </Table> */}
        <DataTableTraining columns={columns_training} data={training} />
      </div>
    </div>
  );
}

export default TraingAnalytics;
