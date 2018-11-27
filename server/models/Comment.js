import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  }
});

export default mongoose.model("Comment", CommentSchema);
