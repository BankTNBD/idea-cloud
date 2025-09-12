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
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;