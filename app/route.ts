import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Contable del Hugo - API con Next" });
}
