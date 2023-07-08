import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "../../../../utils/connectDb";
import User from "../../../../models/user";
import Post from "../../../../models/post";

export const POST = async (request: NextRequest) => {
  const { email, prompt, tags } = await request.json();

  try {
    await connectDb();

    const user = await User.findOne({ email });
    await Post.create({
      creator: user._id,
      prompt,
      tags: `#${tags}`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Prompt created successfully.",
      }),
      {
        status: 201,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err }), {
      status: 500,
    });
  }
};
