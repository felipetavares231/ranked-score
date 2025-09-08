import { getMinecraftNameFromId } from "@/app/utils/getMinecraftNameFromId";
import { isMinecraftUuid } from "@/app/utils/isMinecraftUuid";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest, { params }: {
  params: Promise<{
    minecraftId: string
  }>
}) {
  const { minecraftId } = await params;

  if (!isMinecraftUuid(minecraftId)) {
    throw new Error("Parameter minecraftId is not valid")
  }

  const name = await getMinecraftNameFromId(minecraftId);

  return Response.json({
    name
  })
}
