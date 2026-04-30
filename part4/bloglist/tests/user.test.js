const { test, after, beforeEach } = require("node:test");
const User = require("../models/user");
const assert = require("node:assert");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

test("creation fails with proper statuscode and message if password missing", async () => {
  const usersAtStart = await helper.usersInDb();
  const newUser = {
    username: "apa",
    name: "Lucas Apablaza",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);
  const usersAtEnd = await helper.usersInDb();

  assert(result.body.error.includes("username or password missing"));
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

test("creation fails with proper statuscode and message if username missing", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    name: "Lucas Apablaza",
    password: "secret",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);
  const usersAtEnd = await helper.usersInDb();

  assert(result.body.error.includes("username or password missing"));
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

test("creation fails with proper statuscode if username is less than 3 characters", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "ro",
    name: "Lucas Apablaza",
    password: "secret",
  };

  const result = await api.post("/api/users").send(newUser).expect(500);
  const usersAtEnd = await helper.usersInDb();

  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

test.only("creation fails with proper statuscode if password is less than 3 characters", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "apa",
    name: "Lucas Apablaza",
    password: "se",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);
  const usersAtEnd = await helper.usersInDb();

  assert(
    result.body.error.includes("password must be at least 3 characters long"),
  );
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

test.after(async () => {
  await mongoose.connection.close();
});
