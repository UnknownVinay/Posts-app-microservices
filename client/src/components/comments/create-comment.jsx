import axios from "axios";
import React, { useState } from "react";

const CreateComments = ({ postId }) => {
  const [comment, setComment] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 3) {
      await axios.post(`http://comments-srv:4001/posts/${postId}/comments`, {
        content: comment,
      });
      setComment("");
    } else {
      alert("comment should be atleast 3 character long");
    }
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Comments</label>
          <input
            className="form-control"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a Comment..."
          />
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComments;
