// import axios from "axios";
// import React, { useEffect, useState } from "react";

const ShowComments = ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchCommentsByPostId = async () => {
  //   const { data } = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   setComments(data);
  // };

  // useEffect(() => {
  //   fetchCommentsByPostId();
  // }, []);

  const renderComments = comments.map((comment) => {
    // const displayComment = () => {
    //   if (comment.status === "approved") {
    //     return comment.content;
    //   } else if (comment.status === "rejected") {
    //     return "Comment has not meet required app policy";
    //   } else {
    //     return "Comment has yet to be reviewed";
    //   }
    // };
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "rejected") {
      content = "Comment has been rejected";
    }

    if (comment.status === "pending") {
      content = "comment is yet to be moderated";
    }

    return (
      <li key={comment.id}>
        <p>{content}</p>
      </li>
    );
  });
  return (
    <div>
      <h4>{comments.length} comments</h4>
      <ul>{renderComments}</ul>
    </div>
  );
};

export default ShowComments;
