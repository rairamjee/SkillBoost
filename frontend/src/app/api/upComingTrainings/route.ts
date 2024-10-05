import prisma from "../../../../utils/db";

export async function GET(req: Request) {
  try {
    const date = new Date();

    const upcomingTrainings =
      await prisma.$queryRaw`SELECT * FROM "Training" WHERE "startDate">${date}`;
    // console.log(upcomingTrainings);

    if (upcomingTrainings) {
      return new Response(
        JSON.stringify({
          message: "Upcoming Trainings",
          data: upcomingTrainings,
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "No Trainings Available",
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
