import prisma from "../../../../utils/db";

export async function GET(req: Request) {
    try {
        const trainings = await prisma.training.findMany()
        if (trainings.length > 0) {
            return new Response(JSON.stringify({
                message: "List of All the Trainings",
                data: trainings
            }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        }
        else{
            return new Response(JSON.stringify({
                message:"No Trainings Available",
                data:null
            }),
            {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    } catch (error) {
        console.log("Error :",error);

        return new Response(JSON.stringify({
            message:"Internal Server Error",
            data:null
        }),{
            status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
        })
    }
}