import bcrypt from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const {username, password}= await request.json();
        //checking the existing user
        const user = await User.findOne({ username });
        if(!user){
            return NextResponse.json({message: "User does not exist"}, {status: 400})
        }
        //checking the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({message: "Password is incorrect"}, {status: 400})
        }
        const tokenData = {
            id: user._id,
            username: username.username,
            email: user.email
        }

        const generateToken = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: "1d"});
        const response = NextResponse.json({message: "Login successful", success: true}, {status: 200}) ;
        response.cookies.set("token",generateToken,{ httpOnly: true, maxAge: 24 * 60 * 60 });
        return response;

        
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}