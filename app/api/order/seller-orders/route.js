import connectDB from "@/config/db";
import { getAuth} from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Address from "@/models/Address";
import Product from "@/models/Product";
import Order from "@/models/Order";
import authSeller from "@/lib/authSeller";


// Function to display orders placed on the backend
export async function GET(request){
    try {
        const {userId} = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return  NextResponse.json({success: false, message:"Not authorised"});
        }

        await connectDB()

        Address.length

        const orders = await Order.find({}).populate('address items.product')


       return  NextResponse.json({success: true, orders});

    } catch (error) {
        return NextResponse.json({success:false, message:error.message})
    }
}