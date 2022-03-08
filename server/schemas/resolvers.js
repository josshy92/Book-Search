const { Book, User } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query: {
       me: async ( parent, args, context ) => {
           if (context.user) {
           return User.findOne({ _id: userId })
           }
           throw new AuthenticationError('You must be logged in.')
       },
    },
    Mutation: {
        createUser: async (parent, name, email, password) => {
            const user = await User.create(name, email, password);
            const token = signToken(user);

            return (token, user);
        },
        login: async (parent, { email, password }) => {
            const user = await
                User.findOne({ email });

            if (!user) {
                throw new AuthenticationError
                    ("Invalid user name or password");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError
                    ('Invalid username or password')
            }

            const token = signToken(user)
            return { token, profile }
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const bookUser= await User.findOneAndUpdate(
                    { _id: userId},
                    {
                        $push: { books: book },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return bookUser;
            }
            throw new AuthenticationError("You must be logged in.");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: { savedBooks: bookId }},
                    { new: true }
                );
                return updateUser
            }
            throw new AuthenticationError("You must be logged in.")
        }
    }
}


module.exports = resolvers; 