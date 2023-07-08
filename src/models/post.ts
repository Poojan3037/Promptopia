import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
  },
  tags: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
