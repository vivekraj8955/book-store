import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BooksDetails = () => {
  const history = useNavigate();
  const [input, setInput] = useState();
  const [checked, setChecked] = useState(false);
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/books/${id}`)
        .then((res) => res.data)
        .then((data) => setInput(data.book));
    };
    fetchHandler();
  }, [id]);
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/books/${id}`, {
        name: String(input.name),
        author: String(input.author),
        description: String(input.description),
        price: Number(input.price),
        image: String(input.image),
        available: Boolean(checked),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest().then(() => history("/books"));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    input && (
      <div>
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
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label="Available"
            />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Box>
        </form>
      </div>
    )
  );
};

export default BooksDetails;
