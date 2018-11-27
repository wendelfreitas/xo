import uuid from "uuid";

import Comment from "../../../server/models/Comment";

export default {
  Query: {},
  Mutation: {
    createComment: async (parent, { comment }, context, info) => {
      const newComment = new Comment({ id: uuid(), ...comment });

      return new Promise((resolve, reject) => {
        newComment.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateComment: async (parent, { id, comment }, context, info) => {
      return new Promise((resolve, reject) => {
        Comment.findByIdAndUpdate(
          id,
          { $set: { ...comment } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteComment: async (parent, { id }, context, info) => {
      return new Promise((resolve, reject) => {
        Comment.findByIdAndDelete(id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Subscription: {
    comment: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  }
};
