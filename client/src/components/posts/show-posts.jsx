import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateComments from "../comments/create-comment";
import ShowComments from "../comments/show-comments";

const ShowPost = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://query-srv:4002/posts");

      setPosts(response.data);
    } catch (error) {
      console.error(error?.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rendredPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <ShowComments comments={post.comments} />
          <CreateComments postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {rendredPosts}
    </div>
  );
};

export default ShowPost;
