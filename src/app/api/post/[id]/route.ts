import Post from "@/models/post";
import { connectDb } from "@/utils/connectDb";
import { log } from "console";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectDb();

    const postId = params.id;
    const isPostExist = await Post.findById({ _id: postId }).populate(
      "creator"
    );
    if (isPostExist) {
      return new Response(JSON.stringify(isPostExist), { status: 200 });
    } else {
      return new Response("Prompt Not Found", { status: 404 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request, { params }: any) => {
  const { prompt, tags } = await request.json();
  try {
    await connectDb();

    const postId = params.id;
    const isPostExist = await Post.findById({ _id: postId }).populate(
      "creator"
    );

    if (isPostExist) {
      isPostExist.prompt = prompt;
      isPostExist.tags = tags;
      await isPostExist.save();
      return new Response("Successfully updated the Prompts", { status: 200 });
    } else {
      return new Response("Prompt Not Found", { status: 404 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    await connectDb();

    const postId = params.id;
    await Post.findByIdAndRemove({ _id: postId });
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
};
