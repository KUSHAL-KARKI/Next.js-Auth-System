import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helper/mailer";
import { connect } from "@/dbconfig/dbConfig";
connect();

export async function POST(req: NextRequest) {
try {
    const {email}= await req.json();
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    sendEmail({ email: user.email, emailType: "RESET", userId: user._id });
    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });

    
} catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
}