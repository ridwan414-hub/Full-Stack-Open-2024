const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allAuthors: async () => { return await Author.find({}) },
        allBooks: async (root, args) => {
            const foundAuthor = await Author.findOne({ name: args.author })

            if (args.author && args.genres) {
                return await Book.find({ author: foundAuthor.id, genres: { $in: args.genres } }).populate('author')
            }
            else if (args.author) {
                return await Book.find({ author: foundAuthor.id }).populate('author')
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
                return author
            }
        },
        createUser: async (root, arg) => {
            const user = new User({ username: arg.username })
            try {
                await user.save()
            } catch (error) {
                throw new GraphQLError('saving user failed', {
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
}


module.exports = resolvers  