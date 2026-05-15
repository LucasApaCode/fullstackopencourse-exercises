import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

test("renders title", () => {
  const blog = {
    title: "Test title",
    author: "Lucas Apablaza",
    likes: 5,
    url: "www.testexample.com",
    user: {
      id: "12345",
    },
  };

  const user = {
    username: "apa",
    id: "12345",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("Test title");

  expect(element).toBeDefined();
});

test("clicking the 'view' button shows details", async () => {
  const blog = {
    title: "Test title",
    author: "Lucas Apablaza",
    likes: 5,
    url: "www.testexample.com",
    user: {
      id: "12345",
    },
  };

  const userTest = {
    username: "apa",
    id: "12345",
  };

  render(<Blog blog={blog} user={userTest} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const url = screen.getByText("www.testexample.com");
  const likes = screen.getByText("likes 5");

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("clicking the 'like' button twice calls event handler two times", async () => {
  const blog = {
    title: "Test title",
    author: "Lucas Apablaza",
    likes: 5,
    url: "www.testexample.com",
    user: {
      id: "12345",
    },
  };

  const userTest = {
    username: "apa",
    id: "12345",
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={userTest} likedBlog={mockHandler} />);

  const user = userEvent.setup();

  const buttonView = screen.getByText("view");
  await user.click(buttonView);

  const buttonLike = screen.getByText("like");
  await user.click(buttonLike);
  await user.click(buttonLike);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
