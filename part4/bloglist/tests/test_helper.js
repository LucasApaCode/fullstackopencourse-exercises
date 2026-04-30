const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "SuperTest 1",
    author: "Lucas Apablaza",
    url: "https://example.com",
    likes: 35,
  },
  {
    title: "SuperTest 2",
    author: "Lucas Apablaza",
    url: "https://example.com",
    likes: 40,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
