import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book";
import "./Book.css";
const URL = "http://localhost:5000/books";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const Books = () => {
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  },);
  console.log(books);
  return (
    <>

      <div className="container-fluid default overflow-hidden">
        <div className="row ">
          {books && books.map((book, i) => (
            <div className="col-4 d-flex justify-content-center margin" key={i}>
              <Book book={book} />
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Books;
