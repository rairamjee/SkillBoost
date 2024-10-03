import prisma from "../../../../../utils/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

    try {
        const results=await prisma.response.findMany({
            where:{
                userId:parseInt(params.id)
            }
        })

        if(results){
        return new Response(
          JSON.stringify({
            message: "Success",
            data:results
          }),{
            status:200,
            headers: {
                "Content-Type": "application/json"
            }
          }
        );
    }
    else{
        return new Response(
            JSON.stringify({
                message:"No Results Found",
                data:null
            }),{
                status:404,
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
    }


    } catch (error) {
        console.log("Error :",error);
        return new Response(
            JSON.stringify({
              message: "Success",
              data:null
            }),{
                status:500,
                headers:{
                    "Content-Type":"application/json"
                }
            }
          );
    }
}
