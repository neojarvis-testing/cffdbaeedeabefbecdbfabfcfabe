const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");
const Book = require("../models/bookModel");

let createdbookId;

describe('Endpoints', () => {

    it('Endpoint_api_book_should_exist_POST', async () => {
        const newBook = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Fiction",
            "publicationYear": 1925,
            "coverImage": "great-gatsby.jpg"
        };

        const response = await request(app)
            .post('/book')
            .send(newBook)
            .expect(200);

        createdbookId = response.body._id;

        expect(response.body.title).toEqual(newBook.title);
        expect(response.body.author).toEqual(newBook.author);
        expect(response.body.genre).toEqual(newBook.genre);
        expect(response.body.publicationYear).toEqual(newBook.publicationYear);
        expect(response.body.coverImage).toEqual(newBook.coverImage);
    });

    it('Endpoint_api_book_should_exist_GET', async () => {
        const response = await request(app)
            .get('/book')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Endpoint_api_book_should_exist_GET_BY_ID', async () => {
        const specificId = createdbookId;
        const response = await request(app)
            .get(`/book/${specificId}`)
            .expect(200);
    });

    it('Endpoint_api_book_should_exist_UPDATE_BY_ID', async () => {
        const specificId = createdbookId;
        const updatedData = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Classic Fiction",
            "publicationYear": 1926,
            "coverImage": "great-gatsby.jpg"
        };

        const response = await request(app)
            .post(`/book/${specificId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.title).toEqual(updatedData.title);
        expect(response.body.author).toEqual(updatedData.author);
        expect(response.body.genre).toEqual(updatedData.genre);
        expect(response.body.publicationYear).toEqual(updatedData.publicationYear);
        expect(response.body.coverImage).toEqual(updatedData.coverImage);
    });

    it('Endpoint_api_book_should_exist_DELETE_BY_ID', async () => {
        const specificId = createdbookId;
        const response = await request(app)
            .delete(`/book/${specificId}`)
            .expect(200);
    });

    it('Invalid_Endpoint_api_books_POST_status_code_404', async () => {
        const newBook = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Fiction",
            "publicationYear": 1925,
            "coverImage": "great-gatsby.jpg"
        };
    
        const response = await request(app)
            .post('/books')
            .send(newBook)
            .expect(404);
    });
    
    it('Invalid_Endpoint_api_books_GET_status_code_404', async () => {
        const response = await request(app)
            .get('/books')
            .expect(404);
    });
    
    it('Invalid_Endpoint_api_books_GET_BY_ID_status_code_404', async () => {
        const specificId = createdbookId;
        const response = await request(app)
          .get(`/books/${specificId}`)
          .expect(404);
    });

    it('Invalid_Endpoint_api_books_UPDATE_BY_ID_status_code_404', async () => {
        const specificId = createdbookId;
        const updatedData = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Classic Fiction",
            "publicationYear": 1926,
            "coverImage": "great-gatsby.jpg"
        };

        const response = await request(app)
            .post(`/books/${specificId}`)
            .send(updatedData)
            .expect(404);
    });
    
    it('Invalid_Endpoint_api_books_DELETE_BY_ID_status_code_404', async () => {
        const specificId = createdbookId;
        const response = await request(app)
            .delete(`/books/${specificId}`)
            .expect(404);
    });
});