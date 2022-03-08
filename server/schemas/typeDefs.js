const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        authors: String
        description: String
        bookID: String
        image: String
        link: String
        title: String
    }

    type Auth{
        token: ID
        user: User
    }

    type Query{
        users: [User]
        user(username: String!): User
        books(username: String): [Book]
        book(bookId: ID!): Book
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!)
        : Auth
        login(email: String!, password: String!): Auth
        saveBook(bookId: ID!): Book
        removeBook(boodId: ID!): User
    }

    input savedBook{
        authors: String
        description: String
        bookId: String!
        image: String
        link: String
        title: String
    }
`;

module.exports = typeDefs