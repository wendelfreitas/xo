import Comment from "../../../server/models/Comment";

export default {
  Query: {},
  Mutation: {},
  Subscription: {
    comment: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  }
};
