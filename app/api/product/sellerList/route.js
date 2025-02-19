import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server"
import connectDB from "@/config/db";
import Product from "@/models/Product";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";


export async function GET(request){
    try {
        const {userId} = getAuth(request)

        const isSeller = await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({success: false, message: 'Not Authorized'})
        }

        await connectDB()

        const products = await Product.find({})

        return NextResponse.json({success: true, products})


    } catch (error) {
        return NextResponse.json({success: false, message: 'error.message'})

    }
}