const express = require('express')
const cors = require('cors')
const { getAllBooks, getBookById } = require('./controllers')

const app = express()

app.use(cors())


app.get('/books', (req, res) => {
    const books = getAllBooks()
    res.status(200).json({ books })
})

app.get('/books/details/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = getBookById(id)
    res.status(200).json({ book })
})


module.exports = { app }