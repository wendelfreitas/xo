import mongoose from "mongoose";

import User from "../../../server/models/User";

const { ObjectId } = mongoose.Types;

export default {
  Query: {
    me: async (root, { id: _id }, context, info) => {
      return await User.findOne({ _id }).exec();
    },
    users: async (root, args, context, info) => {
      const res = await User.find({})
        .populate()
        .exec();

      return res.map(u => ({
        id: u._id.toString(),
        email: u.email,
        password: u.password,
        other: u.other
      }));
    }
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      const newUser = await new User({ id: _id.toString(), ...user });

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
