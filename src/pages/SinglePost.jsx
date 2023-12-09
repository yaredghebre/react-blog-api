import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import myBlog from '../assets/myblog..png';

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user.name;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, usersData, categoriesData, tagsData] =
          await Promise.all([
            axios.get(`http://localhost:3000/posts/${slug}`),
            axios.get('http://localhost:3000/users'),
          ]);

        setPost(postData.data);
        setUsers(usersData.data.users);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center bg-blue-200 lg:min-h-screen">
      <div className="min-w-[500px] rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="relative block w-full overflow-hidden rounded-t-lg">
          {!post.image && (
            <p className="w-ful absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform bg-gray-900 py-2 text-center text-3xl font-bold uppercase text-red-500">
              Image Unavailable
            </p>
          )}
          <img
            className="w-full rounded-t-lg object-cover"
            src={post.image || myBlog}
            alt={post.title}
          />
        </div>
        <div className="p-10">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <div className="p-5">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Caption: {post.content}
            </p>
            <p>Slug: {post.slug}</p>
            <p>User: {getUserById(post.userId)}</p>
            <p>Category: {post.category.name} </p>
            <ul>
              Tags:
              {post.tags?.map((tag, index) => (
                <span key={index}>
                  {tag.name}
                  {index !== post.tags.length - 1 ? ', ' : ''}
                </span>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
