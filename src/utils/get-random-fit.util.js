export const getRandomFit = () => {
  const values = ['fill', 'contain', 'cover', 'scale-down'];

  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
};
