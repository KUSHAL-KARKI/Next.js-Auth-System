import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";

connect();

export const GET = async (request: NextRequest) => {
  try {
    const { id } = await getDataFromToken(request);

    if (!id) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User found", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in /api/users/me:", error.message || error);
    return NextResponse.json(
      { message: "Unauthorized or invalid token" },
      { status: 401 }
    );
  }
};
