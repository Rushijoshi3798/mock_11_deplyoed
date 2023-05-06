const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { auth } = require("./middlewares/auth");
const { userRouter } = require("./routes/user.routes");
const { bookRouter } = require("./routes/book.routes");
const { orderRouter } = require("./routes/order.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req,res) => {
//     res.status(200).send({msg: "Home Page"})
// })

app.use("/", userRouter);

app.use("/orders", orderRouter);
app.use("/books", bookRouter);
app.use("/auth", auth);



app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Connection Failed!")
    }

    console.log(`Server is running on port ${process.env.PORT}`);
})