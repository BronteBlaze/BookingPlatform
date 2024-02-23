const getImagePath = (imagePath) => {
  let pathOfImage;
  let originalPath;

  if (imagePath.includes("\\")) {
    pathOfImage = imagePath.split("\\");
  } else {
    pathOfImage = imagePath.split("/");
  }

  pathOfImage.forEach((path, index, image) => {
    if (path === "uploads") {
      originalPath = "/" + path + "/" + image[index + 1];
      return;
    }
  });

  return originalPath;
};

module.exports = getImagePath;
