import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Confirmation from '../components/Confirmation';

const AddNewPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    published: false,
    categoryId: '',
    tags: [],
    userId: '',
  });

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Something went wrong while fetching Users', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Something went wrong while fetching Categories', error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tags');
        setTags(response.data);
      } catch (error) {
        console.error('Something went wrong while fetching Tags', error);
      }
    };

    fetchUsers();
    fetchCategories();
    fetchTags();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/posts',
        formData,
      );
      console.log(response.data);
      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
        navigate('/posts');
      }, 3000);
    } catch (error) {
      console.error('Something went wrong while submitting the form', error);
    }
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          tags: [...prevFormData.tags, value],
        };
      } else {
        return {
          ...prevFormData,
          tags: prevFormData.tags.filter((tagId) => tagId !== value),
        };
      }
    });
  };

  return (
    <div className="h-screen bg-red-200">
      <div className="container mx-auto w-full py-10">
        <h1 className="text-center text-4xl font-bold">Create a New Post</h1>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-11 w-2/5 rounded-md border-2 border-gray-500 bg-red-300 p-5"
        >
          {/* Title */}
          <div className="mb-5">
            <label
              htmlFor="text"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Insert the title of your post"
              required
            />
          </div>

          {/* Content */}
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Content
            </label>
            <textarea
              id="message"
              rows="4"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Insert a caption..."
            ></textarea>
          </div>

          {/* Image */}
          <div className="mb-5">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Image (URL)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Insert the URL of the image"
            />
          </div>

          {/* Categories */}
          <div className="mb-5">
            <label
              for="categories"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="categories"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="mb-5">
            <label
              htmlFor="tags"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Tags
            </label>
            {tags?.map((tag) => (
              <div key={tag.id} className="flex gap-3">
                <input
                  type="checkbox"
                  id={tag.id}
                  name="tags"
                  value={tag.id}
                  checked={formData.tags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                  className="block "
                />
                <label htmlFor={tag.id} className="text-sm">
                  {tag.name}
                </label>
              </div>
            ))}
          </div>

          {/* Users */}
          <div className="mb-5">
            <label
              htmlFor="users"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              User
            </label>
            <select
              id="users"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Published */}
          <div className="mb-5">
            <label
              htmlFor="published"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Published
            </label>
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="form-checkbox ml-2"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
      {showConfirmation && <Confirmation />}
    </div>
  );
};

export default AddNewPost;
