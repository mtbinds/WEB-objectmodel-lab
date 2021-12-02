//Queries (all in one -> Structure)
const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLSchema} = require("graphql");
const { UserType, AnnonceType, CommentType, MessageType, ReplyType, ReviewType }= require("./types");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/essai", {
    useNewUrlParser: true });

const UserModel = require("../models/user");
const AnnonceModel = require("../models/annonce");
const CommentModel = require("../models/comment");
const MessageModel = require("../models/message");
const ReplyModel = require("../models/reply");
const ReviewModel = require("../models/review");

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields : {
            users: {
                type: new GraphQLList(UserType),
                resolve: (root, args, context, info) => {
                    return UserModel.find();
                }
            },
            UserByID: {
                type: UserType,
                args: {
                    id: {type: GraphQLString}
                },
                resolve: (root, args, context, info) => {
                    return UserModel.findById(args.id);
                }
            },
            annonces: {
                 type: new GraphQLList(AnnonceType),
                 resolve: (root, args, context, info) => {
                    return AnnonceModel.find();
                }
            },
            AnnonceByID: {
                type: AnnonceType,
                args: {
                    id: {type: GraphQLString}
              },
              resolve: (root, args, context, info) => {
                   return AnnonceModel.findById(args.id);
              }
            },
            comment: {
                type: new GraphQLList(CommentType),
                resolve: (root, args, context, info) => {
                    return CommentModel.find();
                }
            },
            CommentById: {
                type: CommentType,
                args: {
                    id: {type: GraphQLString}
                },
                resolve: (root, args, context, info) => {
                    return CommentModel.findById(args.id);
                }
            },
            message: {
                type: new GraphQLList(MessageType),
                resolve: (root, args, context, info) => {
                    return MessageModel.find();
               }
            },
            MessageById: {
                type: MessageType,
                args: {
                   id: {type: GraphQLString}
            },
                resolve: (root, args, context, info) => {
                     return MessageModel.findById(args.id);
               }
            },
            reply: {
                type: new GraphQLList(ReplyType),
                resolve: (root, args, context, info) => {
                     return MessageModel.find();
               }
            },
            ReplyById: {
               type: ReplyType,
               args: {
                   id: {type: GraphQLString}
            },
                 resolve: (root, args, context, info) => {
                      return ReplyModel.findById(args.id);
               }
            },
            review: {
                type: new GraphQLList(ReviewType),
                resolve: (root, args, context, info) => {
                     return ReviewModel.find();
               }
            },
            ReviewById: {
               type: ReviewType,
               args: {
                   id: {type: GraphQLString}
            },
                resolve: (root, args, context, info) => {
                     return ReviewModel.findById(args.id);
              }
            },
            like: {
               type: new GraphQLList(UserType),
               resolve: (root, args, context, info) => {
                    return UserModel.find();
              }
            },
            LikeById: {
               type: UserType,
               args: {
                   id: {type: GraphQLString}
            },
                resolve: (root, args, context, info) => {
                    return UserModel.findById(args.id);
              }
            }

        }
    })
});

module.exports = schema;

