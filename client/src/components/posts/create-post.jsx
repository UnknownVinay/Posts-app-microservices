import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://posts.com/posts/create", {
      title: postContent,
    });

    setPostContent("");
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Create a post..."
          />
          <button type="submit" className="btn btn-primary mt-3">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
