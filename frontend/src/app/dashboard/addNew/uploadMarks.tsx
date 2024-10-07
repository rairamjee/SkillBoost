import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadMarks() {
  const [userId, setUserId] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID required!");
      return;
    } else if (!trainingId) {
      toast.error("Training ID required!");
      return;
    } else if (!score) {
      toast.error("Score required!");
      return;
    }
    const marksData = { userId: parseInt(userId), trainingId: parseInt(trainingId), score: parseInt(score) };

    if(marksData.score>100 || marksData.score<0){
      toast.error("Enter a score between 0 to 100");
      return;
    }
    try {
      const response = await axios.post("/api/uploadMarks", marksData);
      
      if (response.status === 201) {
        toast.success("Marks Uploaded!");
      } else if (response.status === 404) {
        toast.error("User ID does not exist!");
      } else if (response.status === 400) {
        toast.error("Required fields are missing!");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Sorry, could not add the marks!";
      toast.error(errorMessage);
      console.error("Error uploading marks:", error);
    }

    console.log("Submitted Data:", marksData);

    setUserId("");
    setTrainingId("");
    setScore("");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Marks</h2>
      <ToastContainer/>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="userId" className="block mb-1">
            User ID
          </label>
          <input
            id="userId"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="trainingId" className="block mb-1">
            Training ID
          </label>
          <input
            id="trainingId"
            type="number"
            value={trainingId}
            onChange={(e) => setTrainingId(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="score" className="block mb-1">
            Score
          </label>
          <input
            id="score"
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <Button type="submit">Upload Marks</Button>
      </form>
    </div>
  );
}

export default UploadMarks;
