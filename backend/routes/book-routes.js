const expres = require("express");
const booksController = require("../controllers/books-controller");
const router = expres.Router();
const Book = require("../model/Book");
router.get("/", booksController.getAllBooks);
router.post("/", booksController.addBooks);
router.get("/:id", booksController.getById);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deletBook);

module.exports = router;
