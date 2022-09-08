import React, { useEffect, useState } from "react";
import Post from "./Post";

export default function DiscussionBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/Posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const renderPosts = () => {
    return posts.map((data) => {
      return <Post {...data} />;
    });
  };

  return <div>{loading ? <h1>Loading...</h1> : renderPosts()}</div>;
}
