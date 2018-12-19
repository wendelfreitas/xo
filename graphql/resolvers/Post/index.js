import User from "../../../server/models/User";
import Post from "../../../server/models/Post";
import Comment from "../../../server/models/Comment";

export default {
  Query: {
    post: async (parent, { _id }, context, info) => {
      return await Post.findById(_id)
        .populate()
        .then(post => post)
        .catch(err => err);
    },
    posts: async (parent, args, context, info) => {
      return await Post.find()
        .populate()
        .then(posts => posts)
        .catch(err => err);
    }
  },
  Mutation: {
    createPost: async (parent, { post }, context, info) => {
      const newPost = await new Post({
        title: post.title,
        body: post.body,
        published: post.published,
        author: post.author
      });

      return new Promise((resolve, reject) => {
        newPost.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updatePost: async (parent, { _id, post }, context, info) => {
      return new Promise((resolve, reject) => {
        Post.findByIdAndUpdate(_id, { $set: { ...post } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deletePost: (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Post.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Subscription: {
    post: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  },
  Post: {
    author: async ({ author }, args, context, info) => {
      return await User.findById(author);
    },
    comments: async ({ author }, args, context, info) => {
      return await Comment.find({ author });
    }
  }
};
