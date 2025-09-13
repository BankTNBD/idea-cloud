import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  generator: {
    type: String,
    required: false,
    default: "Anonymous",
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;