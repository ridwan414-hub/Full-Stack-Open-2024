import { gql } from "@apollo/client"

//fragment is a way to define a reusable piece of a query
const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        id
        title
        author {
            name
            id
            born
            bookCount
        }
        published
        genres
    }
`
const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        id
        name
        born
        bookCount
    }
`
//queries
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`
export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
//query with variables
export const BOOKS_BY_GENRE = gql`
    query allBooks($genre: String!) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
`
//mutations
export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      ...BookDetails
    } 
  }
  ${BOOK_DETAILS}
`
export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(
        name: $name,
        born: $born) {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const LOGGEDIN_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
//subscriptions
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
export const AUTHOR_EDITED = gql`
    subscription {
        authorEdited {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`