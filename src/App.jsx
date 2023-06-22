import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import MoveableBox from './components/MoveableBox';
import { getRandomImage } from './utils/get-random-image.util';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [moveables, setMoveables] = useState([]);
  const [active, setActive] = useState(null);

  const container = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetch('https://jsonplaceholder.typicode.com/photos')
        .then(res => res.json())
        .then(data => {
          setImages(data);
          setIsLoading(false);
        })
        .catch(e => {
          console.error('Something went wrong with the images service.', e);
        });
    })();
  }, []);

  const handleAddMoveable = () => {
    const image = getRandomImage(images);
    setMoveables([...moveables, { id: nanoid(6), image }]);
  };

  const handleRemove = id => {
    const newMoveables = moveables.filter(m => m.id !== id);
    setMoveables(newMoveables);
  };

  return (
    <main className="container">
      <div>
        <button
          onClick={handleAddMoveable}
          className="button"
          disabled={isLoading}
        >
          Add Moveable
        </button>
      </div>
      <div ref={container} className="boxes-container">
        {moveables.map(({ id, image }) => (
          <MoveableBox
            id={id}
            key={id}
            image={image}
            active={active}
            setActive={setActive}
            container={container}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
