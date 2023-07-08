import Post from "@/models/post";
import User from "@/models/user";
import { connectDb } from "@/utils/connectDb"

export const POST = async (request: Request) => {

    const { email } = await request.json()

    try {
        await connectDb();

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {

            const usrerId = isUserExist._id
            const userData = await Post.find({ creator: usrerId }).populate("creator")

            return new Response(JSON.stringify(userData), { status: 200 })
        } else {
            return new Response("User not found", { status: 404 })
        }

    } catch (err) {
        return new Response(JSON.stringify({ success: false, message: err }), { status: 500 })
    }
}