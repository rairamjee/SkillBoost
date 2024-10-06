import prisma from "../../../../../utils/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id);

  console.log(userId);

  try {
    // Fetch both user details and responses in one query
    const results = await prisma.response.findMany({
      where: {
        userId: userId,
      },
    });

    const userDetails = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        // Use select to specify which fields to return
        userId: true,
        userName: true,
        email: true,
        role: true,
        designation: true,
        gender: true,
      },
    });

    // Check if user details exist
    if (!userDetails) {
      return new Response(
        JSON.stringify({
          message: "User Not Found",
          data: null,
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
          user: userDetails,
          responses: results,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        data: null,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
