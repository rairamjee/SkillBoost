import { useEffect, useState } from "react"
import axios from "axios"

import {EmployeeDetails, columns } from "./(employeeAnalytics)/columns"
import { DataTable } from "./(employeeAnalytics)/data-table"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
function EmployeeAnalytics() {

    const [employees, setEmployees] = useState([])
    const [loading,setLoading]=useState<Boolean>(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/employee')
                console.log(response.data.data);
                setEmployees(response.data.data);
            } catch (error) {
                console.log("Error :", error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>;
    return (
        <div className="ml-4 mt-8">
            <h1 className="font-bold text-2xl">Employee List</h1>
            <div style={{width:'1000px'}} className="mt-8">
                {/* <Table >
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Employee Id</TableHead>
                            <TableHead className="font-bold">Employee Name</TableHead>
                            <TableHead className="font-bold">Email</TableHead>
                            <TableHead className="font-bold">Designation</TableHead>
                            <TableHead className="font-bold">Gender</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee:any) => (
                            <TableRow key={employee.userId}>
                                <TableCell>{employee.userId}</TableCell>
                                <TableCell >{employee.userName}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.designation}</TableCell>
                                <TableCell >{employee.gender}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>

                        </TableRow>
                    </TableBody>
                </Table> */}
                <DataTable columns={columns} data={employees} />

            </div>
        </div>
    )
}

export default EmployeeAnalytics