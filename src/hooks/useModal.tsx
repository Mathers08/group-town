import { useState } from 'react';

const useModal = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const onModalClick = () => setIsModalActive(!isModalActive);

  return {
    isModalActive, onModalClick,
  };
};

export default useModal;