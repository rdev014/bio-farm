import connectDb from "@/lib/db";
import { Blog } from "@/models/blogSchema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
try {
    await connectDb();
    const blogs  = await Blog.find({})
    return NextResponse.json(blogs,{status:200})
    
} catch (error) {
    return NextResponse.json({error:"something went wrong try again later"},{status:500})
}
}