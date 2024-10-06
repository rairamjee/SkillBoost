import prisma from "../../../../utils/db";

export async function POST(req: Request) {
  try {
    const { trainingName, description, domainName, duration } =
      await req.json();

    // Check for missing fields
    if (!trainingName || !description || !domainName || !duration) {
      return new Response(
        JSON.stringify({
          message: "All fields are mandatory",
          data: null,
        }),
        {
          status: 400,
        }
      );
    }

    // Create new training record
    const newTraining = await prisma.training.create({
      data: {
        trainingName,
        description,
        domainName,
        duration,
      },
    });

    // Return success response with created training data
    return new Response(
      JSON.stringify({
        message: "Training created successfully",
        data: newTraining,
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
