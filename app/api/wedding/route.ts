import { NextResponse } from "next/server";
import { getWeddingData } from "@/lib/data-store";

export async function GET() {
  const data = await getWeddingData();
  return NextResponse.json(data);
}
