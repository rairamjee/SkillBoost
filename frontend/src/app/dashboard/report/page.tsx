"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

// import { TrendingUp } from "lucide-react"
// import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

function Report() {
    interface Report{
        "responseId":number,
        "userId":number,
        "trainingId":number,
        "score":number,
        "responseDate":Date
    }
    const [employeeReportDetails,setEmployeeReportDetails]=useState<Report | null>(null)

    const id:number=5;
    useEffect(()=>{
        const fetchEmployeeDetails= async ()=>{
            try {
                const employeeReport= await axios.get(`/api/employeeDetails/${id}`);
                setEmployeeReportDetails(employeeReport.data.date);
                console.log(employeeReport.data.data);
            } catch (error) {
                console.log("Error :",error);
            }
        }

        fetchEmployeeDetails();
    },[id])
  return (
    <div>
        <h1 className='font-bold text-2xl'>Report</h1>
    </div>
  )
}

export default Report