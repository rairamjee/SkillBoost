import prisma from "../../../../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  console.log(email, password);
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return new Response(
      JSON.stringify({
        message: "User Not Found",
        data: null,
      }),
      {
        status: 404,
      }
    );
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordMatch) {
    return new Response(
      JSON.stringify({
        message: "Invalid password",
        data: null,
      }),
      {
        status: 401,
      }
    );
  }

  const token = jwt.sign(
    {
      id: existingUser.userId,
      email: existingUser.email,
      roles: existingUser.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "2d" }
  );

  return new Response(
    JSON.stringify({
      message: "Successfully Signed In",
      data: {
        token: token,
        userId: existingUser.userId,
        name: existingUser.userName,
        role: existingUser.role,
        email: existingUser.email,
        designation: existingUser.designation,
      },
    }),
    {
      status: 200,
    }
  );
}
