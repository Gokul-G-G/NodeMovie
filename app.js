const express = require("express");
const path = require("path");
const moviesRouter = require("./routes/moviesRouter");
const app = express();

app.use(express.json());
app.use("/movies", moviesRouter);


app.listen(3000, () => {
  console.log("Server started...");
});

