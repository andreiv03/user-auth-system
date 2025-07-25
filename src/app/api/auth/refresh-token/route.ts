import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { signToken, verifyToken } from "@/utils/jwt";

export async function POST() {
	try {
		const refreshToken = (await cookies()).get("refreshToken");
		if (!refreshToken?.value) {
			(await cookies()).delete("accessToken");
			return NextResponse.json({ success: true, accessToken: null });
		}

		const decoded = await verifyToken(refreshToken.value);
		if (!decoded?.sub) {
			(await cookies()).delete("accessToken");
			(await cookies()).delete("refreshToken");
			return NextResponse.json({ success: true, accessToken: null });
		}

		const accessToken = await signToken(decoded.sub, "10m");
		return NextResponse.json({ success: true, accessToken });
	} catch {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}
}
