import uuid from "uuid";

import User from "../../../server/models/User";

export default {
  Query: {
    me: async (parent, { id }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findOne(id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: async (parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      const newUser = new User({ id: uuid(), ...user });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (parent, { id, user }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, { $set: { ...user } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: async (parent, { id }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
