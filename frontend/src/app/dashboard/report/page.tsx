// "use client"
// import axios from 'axios';
// import React, { useEffect } from 'react'

// function Report() {

//     const id:number=5;
//     useEffect(()=>{
//         const fetchEmployeeDetails= async ()=>{
//             try {
//                 const employeeReport= await axios.post(`/api/employeeDetails/${id}`);
//                 console.log(employeeReport);
//             } catch (error) {
//                 console.log("Error :",error);
//             }
//         }

//         fetchEmployeeDetails();
//     },[id])
//   return (
//     <div>
//         <h1 className='font-bold text-2xl'>Report</h1>
//     </div>
//   )
// }

// export default Report