const { test, after, beforeEach } = require("node:test");
const Blog = require("../models/blog");
const assert = require("node:assert");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "SuperTest 3",
    author: "Lucas Apablaza",
    url: "https://example.com",
    likes: 25,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
});

test("the identifier parameter is called correctly", async () => {
  const response = await api.get("/api/blogs");
  const body = response.body;

  assert.ok(body[0].id !== undefined);
});

test("the likes property is missing from the request so it has a value of 0", async () => {
  const newBlog = {
    title: "SuperTest 3",
    author: "Lucas Apablaza",
    url: "https://example.com",
  };

  await api.post("/api/blogs").send(newBlog);

  const response = await api.get("/api/blogs");
  const body = response.body;

  assert.strictEqual(body[body.length - 1].likes, 0);
});

test("title or url property is missing from the request so a status 400 is returned", async () => {
  const newBlog = {
    author: "Lucas Apablaza",
    url: "https://example.com",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test("a blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const initialBlog = { ...blogsAtStart[0], likes: 100 };

  await api.put(`/api/blogs/${initialBlog.id}`).send(initialBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlog = blogsAtEnd[0];

  assert.strictEqual(updatedBlog.likes, 100);
});

test.after(async () => {
  await mongoose.connection.close();
});
