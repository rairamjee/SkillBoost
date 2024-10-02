import prisma from "../../../../utils/db";

export async function GET(req: Request) {
    try {
        const employees = await prisma.user.findMany({
            where: {
                role: "Employee"
            },
            select:{
                userId:true,
                userName:true,
                email:true,
                role:true,
                designation:true,
                gender:true
            }
        });

        if (employees.length > 0) {
            return new Response(
                JSON.stringify({
                    message: "List of All the Employees",
                    data: employees
                }),
                {
                    status: 200, 
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        } else {
            return new Response(
                JSON.stringify({
                    message: "There are no Employees",
                    data: null
                }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({
                message: "Internal Server Error",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}
