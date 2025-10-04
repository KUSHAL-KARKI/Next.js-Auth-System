import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/getDataFromToken";
connect();

export async function GET(request: NextRequest){
    try {
        const {id} = await getDataFromToken(request);
        const user = await User.findById(id);
        if(!user || !user.isAdmin ){
            return NextResponse.json({message: "Not authorized"}, {status: 403});
        }
        const users = await User.find().select("-password");
        return NextResponse.json({message: "Users fetched", users}, {status: 200});
        
    } catch (error) {
        return NextResponse.json({message: " server error in fetching users"}, {status: 500});
    }
}