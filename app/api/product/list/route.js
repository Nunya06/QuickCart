
import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";



// Function to fetch data from database and display on the webpage

export async function GET(request){
    try {

        await connectDB()

        const products = await Product.find({})

        return NextResponse.json({success: true, products})


    } catch (error) {
        return NextResponse.json({success: false, message: 'error.message'})

    }
}