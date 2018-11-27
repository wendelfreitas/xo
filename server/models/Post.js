import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

export default mongoose.model("Post", PostSchema);
