//dependencies
const express = require("express");
const apiroutes = require("./routes/apiroutes");
const htmlroutes = require("./routes/htmlroutes");

const app = express();
const port = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiroutes);
app.use("/", htmlroutes);

app.listen(port, () => console.log(`listening on port ${port}`));

