const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allAuthors: async () => { return Author.find({}) },
        me: async (root, args, { currentUser }) => currentUser,
        allBooks: async (root, args) => {
            const foundAuthor = await Author.findOne({ name: args.author })

            if (args.author && args.genres) {
                return await Book.find({ author: foundAuthor._id, genres: { $in: args.genres } }).populate('author')
            }
            else if (args.author) {
                return await Book.find({ author: foundAuthor._id }).populate('author')
            }
            else if (args.genres) {
                return await Book.find({ genres: { $in: args.genres } }).populate('author')
            } else {
                return await Book.find({}).populate('author')
            }
        },
    },
    Author: {
        bookCount: async (root) => {
            const foundAuthor = await Author.findOne({ name: root.name })
            const foundBooks = await Book.find({ author: foundAuthor.id })
            return foundBooks.length
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            const existAuthor = await Author.findOne({ name: args.author })
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            if (!existAuthor) {
                const newAuthor = new Author({ name: args.author, })
                try {
                    await newAuthor.save()
                } catch (error) {
                    throw new GraphQLError('saving author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args,
                            error
                        }
                    })
                }
            }

            const foundAuthor = await Author.findOne({ name: args.author })
            const book = new Book({
                ...args,
                author: foundAuthor,
            })
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book

        },
        editAuthor: async (root, args, { currentUser }) => {
            const author = await Author.findOne({ name: args.name })
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            if (!author) {
                return null
            } else {
                author.born = args.born
                try {
                    await author.save()
                } catch (error) {
                    throw new GraphQLError('saving born year failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                }
                pubsub.publish('AUTHOR_EDITED', { authorEdited: author })
                return author
            }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            try {
                await user.save()
            } catch (error) {
                throw new GraphQLError('Creating user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: arg.username,
                        error
                    }
                })
            }
            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password != 'password123') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
        authorEdited: {
            subscribe: () => pubsub.asyncIterator(['AUTHOR_EDITED'])
        }
    }
}


module.exports = resolvers  