
import prisma from "../../../../utils/db";

export async function GET(req:Request){

    try {
        const retentionDetails =await prisma.retention.findMany()
        return new Response(JSON.stringify(retentionDetails),{
            status:200,
            headers:{
                'Content-Type':'application/json'
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Error fetching users', {
            status: 500,
        });
    }
}