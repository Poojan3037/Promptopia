import Post from "../../../models/post";
import { connectDb } from "../../../utils/connectDb";

export const GET = async () => {
  try {
    await connectDb();

    const posts = await Post.find({}).populate("creator");
    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err }), {
      status: 500,
    });
  }
};
