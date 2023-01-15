const express = require("express");
const {db} = require("./models");

const app = express();
const port = 3000;

/**
 * For POST request
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

app.use("/api", require("./routes/api"));

app.get("/", (req, res) => {
  res.send("<h3>Home Page</h3>")
})

db.sequelize
  .sync()
  .then(() => {
    // console.log("sync successfull.");
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });