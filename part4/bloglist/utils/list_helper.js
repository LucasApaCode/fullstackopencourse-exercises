const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    return blogs.reduce((favorite, item) =>
      item.likes > favorite.likes ? item : favorite,
    );
  } else return {};
};

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const counts = _.countBy(blogs, "author");

    const mostAuthorRepeated = _.maxBy(
      Object.keys(counts),
      (key) => counts[key],
    );
    const mostAuthor = {
      author: mostAuthorRepeated,
      blogs: counts[mostAuthorRepeated],
    };

    return mostAuthor;
  } else {
    return {};
  }
};

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const grouped = _.groupBy(blogs, "author");
    const sum = Object.keys(grouped).map((author) => ({
      author,
      likes: _.sumBy(grouped[author], "likes"),
    }));

    return _.maxBy(sum, "likes");
  } else return {};
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
