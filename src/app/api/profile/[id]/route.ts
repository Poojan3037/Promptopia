import Post from "@/models/post";
import { connectDb } from "@/utils/connectDb"

export const GET = async (request: Request, { params }: any) => {
    try {
        await connectDb();

        const usrerId = params.id
        const userData = await Post.find({ creator: usrerId }).populate("creator")

        return new Response(JSON.stringify(userData), { status: 200 })

    } catch (err) {
        return new Response(JSON.stringify({ success: false, message: err }), { status: 500 })
    }
}