import { NextResponse,NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
try {
    const {token}= await request.json();
    const user= await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}});
    if(!user) return NextResponse.json({message:"Token Expired, please try again"}, {status:400}) 
    user.isVerified=true;
    user.verifyToken=undefined;
    user.verifyTokenExpiry=undefined;
    await user.save();
    return NextResponse.json({message:"Email verified successfully, you can now login"}, {status:200})
    
} catch (error) {
    return NextResponse.json({message:"Email not verified, please try again"}, {status:500})
}

}