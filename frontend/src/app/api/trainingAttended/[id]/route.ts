import prisma from "../../../../../utils/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // console.log(params.id);
  try {
    const id = parseInt(params.id);
    const response = await prisma.$queryRaw`
        SELECT T.*, R.*
        FROM "Training" T
        JOIN "Response" R ON T."trainingId" = R."trainingId"
        WHERE R."userId" = ${id};
      `;

    //   console.log(trainings);
    if (response) {
      return new Response(
        JSON.stringify({
          message: "List of trainings participated ",
          data: response,
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "User has not attended any trainings",
          data: null,
        }),
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.log("Error :", error);
    return new Response(
      JSON.stringify({
        message: error,
        data: null,
      }),
      {
        status: 500,
      }
    );
  }
}
