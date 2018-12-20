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
    updatePost: async (parent, { _id, author, post }, context, info) => {
      const newPost = await Post.findById(_id).exec();

      if (newPost.author == author) {
        return Post.findOneAndUpdate(
          _id,
          { $set: { ...post } },
          { new: true }
        ).exec();
      }
    },
    deletePost: async (parent, { _id, author }, context, info) => {
      return await Post.findById(_id)
        .then(post => {
          if (post.author == author) return Post.findOneAndDelete({ _id });
        })
        .catch(err => err);
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
