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
const abroadList = database.collection("abroad");
const courseList = database.collection("course");
const whatWeDoList = database.collection("whatWeDo");

app.get("/blog", async (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  //   console.log(para);
  const data = await blogList
    .find()
    .skip((page - 1) * size)
    .limit(size);
  const blog = await data.toArray();
  res.send(blog);
});

app.get("/abroad", async (req, res) => {
  const data = await abroadList.find();
  const abroad = await data.toArray();
  res.send(abroad);
});

app.get("/course", async (req, res) => {
  const data = await courseList.find();
  const course = await data.toArray();
  res.send(course);
});

app.get("/whatwedo", async (req, res) => {
  const data = await whatWeDoList.find();
  const whatwedo = await data.toArray();
  res.send(whatwedo);
});

app.get("/", (req, res) => {
  res.json({ message: "App is running" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
