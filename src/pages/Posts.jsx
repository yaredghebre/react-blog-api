import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error("Something went wrong while fetching posts:", error);
      });
  }, []);

  return (
    <div className="bg-green-200 lg:h-screen">
      <div className="w-1/2 container mx-auto py-11">
        <h1 className="text-center text-4xl font-bold">ALL POSTS</h1>
        <div className="flex flex-wrap justify-center">
          {posts.map((post) => (
            <div
              key={post.id}
              class="max-w-sm m-4 bg-white border border-gray-200 cursor-pointer transform transtion duration-150 hover:scale-105 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img class="rounded-t-lg" src={post.image} alt={post.title} />
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.title}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
