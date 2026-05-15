import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parten state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("write blog title here");
  const authorInput = screen.getByPlaceholderText("write blog author here");
  const urlInput = screen.getByPlaceholderText("write blog url here");
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "Test Title");
  await user.type(authorInput, "Lucas");
  await user.type(urlInput, "www.exampletest.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Test Title");
  expect(createBlog.mock.calls[0][0].author).toBe("Lucas");
  expect(createBlog.mock.calls[0][0].url).toBe("www.exampletest.com");
});
