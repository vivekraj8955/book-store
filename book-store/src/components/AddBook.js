import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [checked, setChecked] = useState(false);
  const history = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    author: "",
    image: "",
  });
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/books", {
        name: String(input.name),
        author: String(input.author),
        description: String(input.description),
        price: Number(input.price),
        image: String(input.image),
        available: Boolean(checked),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/books"));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        maxWidth={700}
        alignItems={"center"}
        alignSelf={"center"}
        marginLeft={"auto"}
        marginRight={"auto"}
        marginTop={2}
      >
        <FormLabel>Name</FormLabel>
        <TextField
          value={input.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        ></TextField>
        <FormLabel>Author</FormLabel>
        <TextField
          value={input.author}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="author"
        ></TextField>
        <FormLabel>Description</FormLabel>
        <TextField
          value={input.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        ></TextField>
        <FormLabel>Price</FormLabel>
        <TextField
          value={input.price}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
        ></TextField>
        <FormLabel>Image</FormLabel>
        <TextField
          value={input.image}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="image"
        ></TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={input.available}
              onChange={() => setChecked(!checked)}
            />
          }
          label="Available"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddBook;
