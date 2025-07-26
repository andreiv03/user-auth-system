import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { COOKIE_OPTIONS } from "@/config/constants";
import { connectToDatabase } from "@/config/db";
import { signToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, password } = await req.json();
    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });
    if (user) {
      return NextResponse.json({ message: "Email address already registered" }, { status: 400 });
    }

    const newUser = await db.collection("users").insertOne({
      createdAt: new Date(),
      email,
      firstName,
      lastName,
      password: await bcrypt.hash(password, 10),
      updatedAt: new Date(),
    });

    const accessToken = await signToken(newUser.insertedId, "10m");
    const refreshToken = await signToken(newUser.insertedId, "7d");

    (await cookies()).set("accessToken", accessToken, COOKIE_OPTIONS(10 * 60)); // 10 minutes
    (await cookies()).set("refreshToken", refreshToken, COOKIE_OPTIONS(7 * 24 * 60 * 60)); // 7 days

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
  }
}
