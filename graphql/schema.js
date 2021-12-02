// Import required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql")

// Import queries
const { users, user, annonces, annonce, comments, comment, messages, message, replies, reply, reviews, review } = require("./queries")

// Import mutations
const {
  register,
  login,
  addAnnonce,
  addUser,
  addComment,
  addMessage,
  addReply,
  addReview,
  updateAnnonce,
  deleteAnnonce,
  updateUser,
  deleteUser,
  updateComment,
  deleteComment,
  updateMessage,
  deleteMessage,
  updateReply,
  deleteReply,
  updateReview,
  deleteReview,
} = require("./mutations")

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: { users, user, annonces, annonce, comments, comment, messages, message, replies, reply, reviews, review },
})

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    register,
    login,
    addAnnonce,
    addUser,
    addComment,
    addMessage,
    addReply,
    addReview,
    updateAnnonce,
    deleteAnnonce,
    updateUser,
    deleteUser,
    updateComment,
    deleteComment,
    updateMessage,
    deleteMessage,
    updateReply,
    deleteReply,
    updateReview,
    deleteReview
  },
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})
