const express = require("express");
const { auth } = require("../middlewares/auth");
const { BookModel } = require("../model/book.model");
const jwt = require("jsonwebtoken")

const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token, "masai");
    try {
      if (decoded) {
        const books = await BookModel.find();
        res.status(200).send(books);
      }
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });


bookRouter.post("/add", auth, async (req,res) => {
    try {
        const book = await BookModel(req.body);
        await book.save();
        res.status(201).send({msg: "Book Has been Successfully Added to Database" });
    } catch (error) {
        res.status(400).send({msg: "Book has not been Added to Database, Some error Occured! "})
    }
})

bookRouter.patch("/:id", auth ,async (req, res) => {
    const token = req.headers.authorization;
    const payload = req.body;
  
    const decoded = jwt.verify(token, "masai");
    console.log(decoded);
    const req_id = decoded.userID;
  
    const bookID = req.params.bookID;
    const book = await BookModel.findOne({ userID: bookID });
    const userID_in_book = book.userID;
  
    try {
      console.log(req_id, userID_in_book);
      if(req_id === userID_in_book){
        await BookModel.findByIdAndUpdate({_id: book._id}, payload);
        res.status(204).send({msg: "Book has been updated successfully"});
      }else {
        res.status(400).send("You are Not authorized to update this Book");
      }
    } catch (error) {
      res.status(400).send("Err 404 !!");
    }
  });

  bookRouter.delete("/:id", async (req, res) => {
    const token = req.headers.authorization;
  
    const decoded = jwt.verify(token, "masai");
    console.log(decoded);
    const req_id = decoded.userID; // person who requesting to delete book
  
    const bookID = req.params.bookID;
    const book = await BookModel.findOne({ userID: bookID });
    const userID_in_book = book.userID;
  
    try {
      console.log(req_id, "req_id", "&&", userID_in_book, "userID_in_book");
      if (req_id == userID_in_book) {
        await BookModel.findByIdAndDelete({ _id: book._id });
        res.status(202).send({ msg: "Book has been Deleted" });
      } else {
        res.status(400).send("Not authorized to Delete");
      }
    } catch (err) {
      res.status(400).send("Error 404 !!");
    }
  });

module.exports = {
    bookRouter
}