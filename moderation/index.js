const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const invalidWords = ["apple"];

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const { content } = data;
    const found = invalidWords.some((value) => content.includes(value));
    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          ...data,
          status: !found ? "approved" : "rejected",
        },
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation is live");
});
