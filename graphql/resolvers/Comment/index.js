import User from "../../../server/models/User";
import Post from "../../../server/models/Post";
import Comment from "../../../server/models/Comment";

export default {
  Query: {
    comment: async (parent, { _id }, context, info) => {
      return await Comment.findById(_id)
        .populate()
        .then(comment => comment)
        .catch(err => err);
    },
    comments: async (parent, args, context, info) => {
      return await Comment.find()
        .populate()
        .then(comments => comments)
        .catch(err => err);
    }
  },
  Mutation: {
    createComment: async (parent, { comment }, context, info) => {
      const newComment = await new Comment({
        text: comment.text,
        author: comment.author,
        post: comment.post
      });

      return new Promise((resolve, reject) => {
        newComment.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateComment: async (parent, { _id, author, comment }, context, info) => {
      const newComment = await Comment.findById(_id).exec();

      if (newComment.author == author) {
        return Comment.findOneAndUpdate(
          _id,
          { $set: { ...comment } },
          { new: true }
        ).exec();
      }
    },
    deleteComment: async (parent, { _id, author }, context, info) => {
      return await Comment.findById(_id)
        .then(comment => {
          if (comment.author == author)
            return Comment.findOneAndDelete({ _id });
        })
        .catch(err => err);
    }
  },
  Subscription: {
    comment: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  },
  Comment: {
    author: async ({ author }, args, context, info) => {
      return await User.findById({ _id: author });
    },
    post: async ({ _id }, args, context, info) => {
      return await Post.findById(_id);
    }
  }
};
