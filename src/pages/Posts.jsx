import React, { useState, useEffect } from 'react';
import axios from 'axios';
import myBlog from '../assets/myblog..png';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/posts')
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error('Something went wrong while fetching posts:', error);
      });
  }, []);

  return (
    <div className="bg-green-200 lg:min-h-screen">
      <div className="container mx-auto w-full py-11">
        <h1 className="text-center text-4xl font-bold">ALL POSTS</h1>
        <div className="flex flex-wrap justify-center">
          {posts.map((post) => (
            <Link
              to={`/posts/${post.slug}`}
              key={post.id}
              class="transtion m-4 max-w-sm transform cursor-pointer rounded-lg border border-gray-200 bg-white shadow duration-150 hover:scale-105 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="relative block max-h-[150px] w-full max-w-[250px] overflow-hidden rounded-t-lg">
                {!post.image && (
                  <p className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 transform py-2 text-center text-xl font-bold uppercase text-red-500">
                    Image Unavailable
                  </p>
                )}
                <img
                  className="w-full rounded-t-lg object-cover"
                  src={post.image || myBlog}
                  alt={post.title}
                />
              </div>

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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
