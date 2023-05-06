const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  console.log(req.body);

  const { name, email, password, isAdmin } = req.body;

  const exist = await UserModel.findOne({ email });
  console.log(exist);

  if (exist) {
    if (exist.email === email) {
      res.status(400).send({ msg: "User Already Exist, Please Login" });
    }
  } else {

    try {
        bcrypt.hash(password, 5, (err, hash) => {
            const user = new UserModel({email,password: hash, name, isAdmin})
            user.save();
            res.status(201).send({msg: "Registration has been Successfull"})
        })
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
  }
});

userRouter.post("/login", async (req,res) => {
    console.log(req.body);

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({email});
        console.log(user);

        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    res.status(201).send({msg: "Login Successfull", token: jwt.sign({ userID: user._id } , "masai")})
                }else {
                    res.status(400).send({msg: "Password Incorrect"})
                }
            })
        }else {
            res.status(400).send("User Does not Exist, Please Register! ")
        }

    } catch (error) {
        res.status(400).send({msg: error.message})
    }
})

module.exports = {
  userRouter,
};
