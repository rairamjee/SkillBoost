import prisma from "../../../../utils/db";

export async function POST(req: Request) {
  const { trainingId, userId, score } = await req.json();

  try {
      if (!trainingId || !userId || !score) {
        return new Response(
          JSON.stringify({
            message: "Required fields missing",
            data: null,
          }),
          {
            status: 400,
          }
        );
      }
    
      const user = await prisma.user.findUnique({
        where: {
          userId,
        },
      });
    
      if (!user) {
        return new Response(
          JSON.stringify({
            message: "User Does not exist",
            data: null,
          }),
          {
            status: 404,
          }
        );
      }
    
      const date = new Date();
    
      const added = await prisma.response.create({
        data: {
          userId: parseInt(userId),
          trainingId: parseInt(trainingId), 
          score: parseInt(score),
          responseDate: date,
        },
      });

      if(added){
        return new Response (JSON.stringify({
            message:"Marks Uploaded",
            data:added
        }),{
            status:201
        })
      }
    
  } catch (error) {
     console.log("Error: ", error);

     return new Response(JSON.stringify({
        message:"Interrnal Server Error",
        data:null
     }),{
        status:500
     })
  }

}
