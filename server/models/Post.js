import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  published: {
    type: Boolean,
    require: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

export default mongoose.model("Post", PostSchema);
