import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbConfig";
connect();
import bcryptjs from "bcryptjs";
export async function POST(req: NextRequest) {
    try {
        const {token, newPassword } = await req.json();
        console.log(token,newPassword);
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()} });
        if (!user) {
            return NextResponse.json({ message: "Token Expired, please try again" }, { status: 400 });
        }
        //hash the new password
        const hashedpassword= await bcryptjs.hash(newPassword, 10);

        //update the user password
        user.password = hashedpassword;
        user.forgetPasswordToken = undefined;
        user.forgetPasswordExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Password reset successfully, you can now login" }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}