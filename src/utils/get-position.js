export const getPosition = ({
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  XPosition,
  YPosition
}) => {
  let finalXPosition = XPosition;
  if (finalXPosition < minWidth || finalXPosition > maxWidth) {
    finalXPosition = XPosition < 0 ? minWidth : maxWidth;
  }

  let finalYPosition = YPosition;
  if (finalYPosition < minHeight || finalYPosition > maxHeight) {
    finalYPosition = YPosition < 0 ? minHeight : maxHeight;
  }

  return [finalXPosition, finalYPosition];
};
