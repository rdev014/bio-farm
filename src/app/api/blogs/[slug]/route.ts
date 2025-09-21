import connectDb from "@/lib/db";
import { Blog } from "@/models/blogSchema";
import { NextResponse } from "next/server";
interface Params{slug:string}

export async function GET(request: Request, {params}:{params:Params}) {
    try {
        const {slug} = params;
        await connectDb();
        const blog  = await Blog.find({slug})
        if (!blog){
            return NextResponse.json({error:"blog not found"},{status:404})
        }
        return NextResponse.json(blog,{status:200})
    
    } catch (error) {
         console.log(error);
    return NextResponse.json({error:"something went wrong try again later"},{status:500})
    }
}