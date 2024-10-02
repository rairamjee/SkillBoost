import prisma from "../../../../utils/db";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") as string) || 1;
        const limit = parseInt(url.searchParams.get("limit") as string) || 10;
        const users = await prisma.user.findMany({
            where: { role: "Employee" },
            select: { // Use select to specify which fields to return
                userName: true,
                email: true,
                role: true,
                designation: true,
                gender: true
            },
            skip: (page - 1) * limit,
            take: limit
        });

        const usersCount = await prisma.user.count({
            where: { role: "Employee" }
        })

        return new Response(JSON.stringify({
            users: users,
            currentPage: page,
            totalPage: Math.ceil(usersCount / limit)
        }), {
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
