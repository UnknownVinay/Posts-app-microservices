const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        postId: req.params.id,
        content,
        commentId,
        status: "pending",
      },
    });
  } catch (error) {
    console.log(error?.message);
  }

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, content, commentId, status } = data;
    const comments = commentsByPostId[postId];

    // const updatedComments = comments.map((comment) => {
    //   if (comment.id === commentId) {
    //     return { ...comment, status };
    //   }
    // });
    // commentsByPostId[postId] = [...updatedComments];

    //better way to update the status
    const comment = comments.find((comment) => (comment.id = commentId));
    comment.status = status;
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        postId,
        status,
        content,
        commentId,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("comments is live");
});
