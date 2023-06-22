import { useMemo, useRef } from 'react';
import Moveable from 'react-moveable';
import { getRandomFit } from '../utils/get-random-fit.util';
import { getPosition } from '../utils/get-position';

const MoveableBox = ({
  id,
  image,
  active,
  setActive,
  container,
  handleRemove
}) => {
  const targetRef = useRef(null);
  const isActive = useMemo(() => id === active, [id, active]);
  const objectFit = useMemo(() => getRandomFit(), []);

  const handleSelectAsActive = () => {
    setActive(id);
  };

  const handleDrag = e => {
    if (!container.current) return;
    const targetBounds = targetRef.current.getBoundingClientRect();
    const containerBounds = container.current.getBoundingClientRect();

    const [x, y] = e.translate;

    const [finalXPosition, finalYPosition] = getPosition({
      minWidth: 0,
      maxWidth: containerBounds.width - targetBounds.width,
      minHeight: 0,
      maxHeight: containerBounds.height - targetBounds.height,
      XPosition: x,
      YPosition: y
    });

    e.target.style.transform = `translate(${finalXPosition}px, ${finalYPosition}px)`;
  };

  const handleResize = e => {
    if (!container.current) return;
    const containerBounds = container.current.getBoundingClientRect();

    const OFFSET = 5;
    const maxWidth = containerBounds.width - OFFSET;
    const maxHeight = containerBounds.height - OFFSET;

    let finalWidth = e.width;
    if (finalWidth > maxWidth) {
      finalWidth = maxWidth;
    }

    let finalHeight = e.height;
    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
    }

    const targetBounds = targetRef.current.getBoundingClientRect();

    let [XPosition, YPosition] = e.transform.match(/-?\d+\.?\d*/g).map(Number);

    const [finalXPosition, finalYPosition] = getPosition({
      minWidth: 0,
      maxWidth: containerBounds.width - targetBounds.width,
      minHeight: 0,
      maxHeight: containerBounds.height - targetBounds.height,
      XPosition,
      YPosition
    });

    e.target.style.width = `${finalWidth}px`;
    e.target.style.height = `${finalHeight}px`;
    e.target.style.transform = `translate(${finalXPosition}px, ${finalYPosition}px)`;
  };

  return (
    <>
      <div ref={targetRef} className="box" onClick={handleSelectAsActive}>
        <button onClick={() => handleRemove(id)} className="box-remove-button">
          X
        </button>
        <img
          className="box-image"
          style={{ objectFit }}
          src={image}
          alt="random"
        />
      </div>
      <Moveable
        target={isActive && targetRef}
        draggable={true}
        throttleDrag={1}
        edgeDraggable={false}
        startDragRotate={0}
        throttleDragRotate={0}
        onDrag={handleDrag}
        keepRatio={false}
        resizable={true}
        throttleResize={1}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        onResize={handleResize}
      />
    </>
  );
};

export default MoveableBox;
