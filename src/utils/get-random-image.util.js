export const getRandomImage = (images = []) => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex].url;
};
