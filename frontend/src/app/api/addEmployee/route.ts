import prisma from "../../../../utils/db";

export async function POST(req: Request) {
  try {
    const { userName, email, password, role, designation, gender } =
      await req.json();

    if (!userName || !email || !password || !role || !designation || !gender) {
      return new Response(
        JSON.stringify({
          message: "All fields are required",
          data: null,
        }),
        {
          status: 400,
        }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password,
        role,
        designation,
        gender,
      },
    });

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        data: newUser,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        data: null,
      }),
      {
        status: 500,
      }
    );
  }
}
