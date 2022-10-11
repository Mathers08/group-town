import { useState } from 'react';

const useColor = () => {
  const blue = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(88, 97, 226, 0.698))';
  const green = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(55, 255, 0, 0.719))';
  const red = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(230, 57, 57, 0.883))';
  const [color, setColor] = useState({
    modal: '#fff',
    text: '#000',
    cell: '#000'
  });

  const onBlueCircleClick = () => setColor({ modal: blue, text: '#fff', cell: blue });
  const onGreenCircleClick = () => setColor({ modal: green, text: '#fff', cell: green });
  const onRedCircleClick = () => setColor({ modal: red, text: '#fff', cell: red });

  return {
    color, setColor, onBlueCircleClick, onGreenCircleClick, onRedCircleClick
  };
};

export default useColor;