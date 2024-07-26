import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
        name
        born
        bookCount
        }
    }
`
export const ALL_BOOKS = gql`
    query {
        allBooks {
         title
         author{
           name
           id
           born
           bookCount
         }
         published
         genres
        }
    }
`
export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      id
      genres
      author {
        name
        id
        born
        bookCount
      }
    } 
  }
`
export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(
        name: $name,
        born: $born) {
        name,
        born
        }
    }
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