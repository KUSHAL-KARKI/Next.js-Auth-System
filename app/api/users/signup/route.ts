import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";


connect();

export async function POST(request:NextRequest){
    try {
        const {username , email , password} = await request.json(); 

        //checking the existing user
        const user = await User.findOne({username})
        if(user){
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }
        //hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt);

        //creating a new user
        const newUser= new User({
            username,
            email,
            password: hashedpassword
        })
       const savedUser = await newUser.save();
       await sendEmail({email: savedUser.email, emailType: "VERIFY", userId: savedUser._id})
        return NextResponse.json({message: "User created successfully" ,success: true, savedUser},{status: 201
        })
        
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
