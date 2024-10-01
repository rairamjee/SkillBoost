import prisma from "../../../../utils/db";

export async function GET(req: Request) {
    try {
        const users = await prisma.user.findMany({
            where: { role: "Employee" },
            select: { // Use select to specify which fields to return
                userName : true,
                email: true,
                role:true ,
                designation: true,
                gender:true
            },
        });
        
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Error fetching users', {
            status: 500,
        });
    }
}
