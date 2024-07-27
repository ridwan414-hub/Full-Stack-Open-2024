import { ALL_AUTHORS, ALL_BOOKS } from "../queries";


export const updateBooksCache = (cache, addedBook) => {
    // helper that is used to eliminate saving same book twice
    const uniqByTitle = (a) => {
        let seen = new Set();
        return a.filter((item) => {
            let k = item.title;
            return seen.has(k) ? false : seen.add(k);
        });
    };
    cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
            allBooks: uniqByTitle(allBooks.concat(addedBook)),
        };
    });
};
export const updateAuthorsCache = (cache, editedAuthor) => {
    // helper that is used to eliminate saving same book twice
    const uniqByName = (a) => {
        let seen = new Set();
        return a.filter((item) => {
            let k = item.name;
            return seen.has(k) ? false : seen.add(k);
        });
    };
    cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
            allAuthors: uniqByName(allAuthors.concat(editedAuthor)),
        };
    });
};