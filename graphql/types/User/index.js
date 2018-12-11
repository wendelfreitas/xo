export default `
  type User {
    id: String!
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
    updateUser(id: String!, user: UpdateUserInput!): User!
    deleteUser(id: String!): User!
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
