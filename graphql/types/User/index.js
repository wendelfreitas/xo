export default `
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Query {
    me: User!
    users: [User!]!
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(id: ID!, user: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }
  
  input UpdateUserInput {
    name: String
    email: String
    age: Int
  } 
`;
