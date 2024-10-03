export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  console.log(params.id);
  return new Response(
    JSON.stringify({
      message: "Hii",
    })
  );
}
