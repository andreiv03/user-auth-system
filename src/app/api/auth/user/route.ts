import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { connectToDatabase } from "@/config/db";
import { verifyToken } from "@/utils/jwt";

export async function GET(req: Request) {
  try {
    const accessToken = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(accessToken);
    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.sub as string) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          ...user,
          password: undefined,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
