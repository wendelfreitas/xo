import uuid from "uuid";

import Post from "../../../server/models/Post";

export default {
  Query: {},
  Mutation: {
    createPost: async (parent, { post }, context, info) => {
      const newPost = new Post({ id: uuid(), ...post });

      return new Promise((resolve, reject) => {
        newPost.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updatePost: async (parent, { id, post }, context, info) => {
      return new Promise((resolve, reject) => {
        Post.findByIdAndUpdate(id, { $set: { ...post } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deletePost: async (parent, { id }, context, info) => {
      return new Promise((resolve, reject) => {
        Post.findByIdAndDelete(id).exec((err, res) => {
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
  }
};
