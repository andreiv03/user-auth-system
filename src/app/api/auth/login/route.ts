import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { COOKIE_OPTIONS } from "@/config/constants";
import { connectToDatabase } from "@/config/db";
import { signToken } from "@/utils/jwt";

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();
		if (!email || !password) {
			return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
		}

		const { db } = await connectToDatabase();
		const user = await db.collection("users").findOne({ email });
		if (!user) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
		}

		const isMatch = await bcrypt.compare(password, user["password"]);
		if (!isMatch) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
		}

		const accessToken = await signToken(user._id, "10m");
		const refreshToken = await signToken(user._id, "7d");

		(await cookies()).set("accessToken", accessToken, COOKIE_OPTIONS(10 * 60)); // 10 minutes
		(await cookies()).set("refreshToken", refreshToken, COOKIE_OPTIONS(7 * 24 * 60 * 60)); // 7 days

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}
}
