import Post from "../../../server/models/Post";

export default {
  Query: {},
  Mutation: {},
  Subscription: {
    post: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  }
};
