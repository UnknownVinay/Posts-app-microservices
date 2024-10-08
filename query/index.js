const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvents = (event) => {
  if (event.type === "PostCreated") {
    posts[event.data.id] = {
      id: event.data.id,
      title: event.data.title,
      comments: [],
    };
  } else if (event.type === "CommentCreated") {
    const comment = {
      id: event.data.commentId,
      content: event.data.content,
      status: event.data.status,
    };
    if (event.data.postId in posts) {
      posts[event.data.postId].comments.push(comment);
    }
  } else if (event.type === "CommentUpdated") {
    const { postId, commentId, content, status } = event.data;
    const comments = posts[postId].comments;
    const comment = comments.find((comment) => comment.id === commentId);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const event = req.body;
  handleEvents(event);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Query is live");

  try {
    const { data } = await axios.get("http://event-bus-srv:4005/events");
    for (let event of data) {
      console.log(`Processing the ${event.type}`);
      handleEvents(event);
    }
  } catch (error) {
    console.log(error);
  }
});
