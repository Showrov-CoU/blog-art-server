const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0vftcn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbConnect = () => {
  try {
    client.connect();
    console.log("Database Connected Successfully✅");
  } catch (error) {
    console.log(error.name, error.message);
  }
};

dbConnect();

const database = client.db("BlogDB");
const blogList = database.collection("blogs");

app.get("/blog", async (req, res) => {
  const data = await blogList.find();
  const blog = data.toArray();
  res.send(blog);
});

app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
