import User from "../../../server/models/User";
import Post from "../../../server/models/Post";
import Comment from "../../../server/models/Comment";

export default {
  Query: {
    user: async (parent, { _id }, context, info) => {
      return await User.findById(_id)
        .populate()
        .then(user => user)
        .catch(err => err);
    },
    users: async (parent, args, context, info) => {
      return await User.find()
        .populate()
        .then(users => users)
        .catch(err => err);
    }
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      const newUser = await new User({
        name: user.name,
        email: user.email,
        age: user.age
      });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (parent, { _id, user }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  User: {
    posts: async ({ _id }, args, context, info) => {
      return await Post.find({ author: _id });
    },
    comments: async ({ _id }, args, context, info) => {
      return await Comment.find({ author: _id });
    }
  }
};
