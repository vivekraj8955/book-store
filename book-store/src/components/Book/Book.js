import { Button } from "@mui/material";
import React from "react";

import "./Book.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Book = (props) => {
  const history = useNavigate();
  const { _id, name, author, description, price, image } = props.book;

  const deletHndler = async () => {
    await axios
      .delete(`http://localhost:5000/books/${_id}`)
      .then((res) => res.data)
      .then(() => history("/books"));
  };
  return (
    <div className="card m-0 p-0">
      <img src={image} alt={name}></img>
      <h4 style={{ textAlign: "center" }}>By:{author}</h4>
      <h3 style={{ textAlign: "center" }}>{name}</h3>
      <h4 style={{ textAlign: "center" }}>{description}</h4>
      <h2 style={{ textAlign: "center" }}>Rs: {price}</h2>
      <Button
        LinkComponent={Link}
        to={`/books/${_id}`}
        sx={{ m: 1 }}
        variant="contained"
      >
        Update
      </Button>
      <Button onClick={deletHndler} sx={{ m: 1 }} variant="contained">
        Delete
      </Button>
    </div>
  );
};

export default Book;
