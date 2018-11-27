export default `
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Query {
    post: Post!
    posts: [Post!]!
  }

  type Mutation {
    createPost(post: CreatePostInput): Post!
    updatePost(id: ID!, post: UpdatePostInput): Post!
    deletePost(id: ID!): Post!
  }

  type Subscription {
    post: PostSubscriptionPayload!
  }

  type PostSubscriptionPayload {
    mutation: MutationType!
    post: Post!
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }
  
  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
