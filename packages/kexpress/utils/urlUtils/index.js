const deleteLastSlash = (url) =>
  url && url.at(-1) === "/" ? url.slice(0, -1) : url;

const addFirstSlash = (url) =>
  url.at(0) !== "/" ? `/${url}` : url;

const formatUrl = (url) =>
  deleteLastSlash(addFirstSlash(url));

const isParameter = (string) => {
  return string[0] === "{" && string.at(-1) === "}";
};

module.exports = {
  formatUrl,
  isParameter,
};
