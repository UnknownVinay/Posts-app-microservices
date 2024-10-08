import React from "react";
import CreatePost from "./components/posts/create-post";
import ShowPost from "./components/posts/show-posts";

const App = () => {
  return (
    <div className="container mt-4 ">
      <h1>Create a Post</h1>
      <CreatePost />
      <hr />
      <h1>Posts</h1>
      <ShowPost />
    </div>
  );
};

export default App;
