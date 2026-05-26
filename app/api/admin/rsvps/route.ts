import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getRSVPs, getAdminStats, deleteRSVP } from "@/lib/data-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "არაავტორიზებული" }, { status: 401 });
  }

  const [rsvps, stats] = await Promise.all([getRSVPs(), getAdminStats()]);
  return NextResponse.json({ rsvps, stats });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "არაავტორიზებული" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID აუცილებელია" }, { status: 400 });
  }

  await deleteRSVP(id);
  const stats = await getAdminStats();
  const rsvps = await getRSVPs();
  return NextResponse.json({ rsvps, stats });
}
