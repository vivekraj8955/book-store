const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }
  if (!books) {
    return res.status(404).json({
      message: "No product found",
    });
  }
  return res.status(200).json({
    books,
  });
};
const addBooks = async (req, res, next) => {
  const { name, author, description, price, available, image } = req.body;
  let book;
  try {
    book = new Book({ name, author, description, price, available, image });
    await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({
      message: "unable to add",
    });
  }
  return res.status(200).json({
    book,
  });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({
      message: "no book found",
    });
  }
  return res.status(200).json({
    book,
  });
};

const updateBook = async (req, res, next) => {
  let book;
  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({
      message: "unable to update by this id",
    });
  }
  return res.status(200).json({
    book,
  });
};

const deletBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({
      message: "unable to delet by this id",
    });
  }
  return res.status(200).json({
    book,
  });
};

exports.getAllBooks = getAllBooks;
exports.addBooks = addBooks;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deletBook = deletBook;
