export default `
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type Query {
    comments: [Comment!]!
  }

  type Mutation {
    createComment(comment: CreateCommentInput): Comment!
    updateComment(id: ID!, comment: UpdateCommentInput): Comment!
    deleteComment(id: ID!): Comment!
  }

  type Subscription {
    comment(postId: ID!): CommentSubscriptionPayload!
  }

  type CommentSubscriptionPayload {
    mutation: MutationType!
    comment: Comment!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }
  
  input UpdateCommentInput {
    text: String
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
