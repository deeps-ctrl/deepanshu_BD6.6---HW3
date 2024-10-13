const request = require('supertest')
const http = require('http')

const { getAllBooks } = require('../controllers')
const { app } = require('../index')

jest.mock("../controllers/index.js", () => ({
    ...jest.requireActual('../controllers/index.js'),
    getAllBooks: jest.fn()
}))

let server
beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3001, done)
})

afterAll((done) => {
    server.close(done)
})

describe('Controller Functions Test', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should return all the books', () => {
        const mockBooks = [
            {
                'bookId': 1,
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'genre': 'Fiction'
            },
            {
                'bookId': 2,
                'title': '1984',
                'author': 'George Orwell',
                'genre': 'Dystopian'
            },
            {
                'bookId': 3,
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'genre': 'Classic'
            }
        ]
        getAllBooks.mockReturnValue(mockBooks)
        const books = getAllBooks()
        expect(books).toEqual(mockBooks)
        expect(books.length).toBe(3)
    })
})

describe('API Endpoints Test', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('GET /books should return all the books', async () => {
        const mockBooks = [
            {
                'bookId': 1,
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'genre': 'Fiction'
            },
            {
                'bookId': 2,
                'title': '1984',
                'author': 'George Orwell',
                'genre': 'Dystopian'
            },
            {
                'bookId': 3,
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'genre': 'Classic'
            }
        ]

        const resp = await request(server).get('/books')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ books: mockBooks })
        expect(resp.body.books.length).toBe(3)
    })

    it('GET /books/details/:id should return the book with matching id', async () => {
        const mockBook = {
            'bookId': 1,
            'title': 'To Kill a Mockingbird',
            'author': 'Harper Lee',
            'genre': 'Fiction'
        }
        const resp = await request(server).get('/books/details/1')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ book: mockBook })
    })
})