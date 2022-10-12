import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import './DropDown.scss';

interface DropDownProps {
  changeCategory: (e: any) => void;
  all: boolean;
}

const DropDown: FC<DropDownProps> = ({ changeCategory, all }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);
  const handleChange = (e: any) => {
    changeCategory(e);
    handleOpen();
  };

  return (
    <motion.div whileTap={{ scale: .9 }} className="drop-down">
      <button onClick={handleOpen} className="drop-down__change">
        {all ? 'Все' : 'Сделанные'} <span>▼</span>
      </button>
      <div className={`item-container ${isOpen && 'show'}`}>
        <div onClick={(e) => handleChange(e)} data-catagory="all" className="drop-down__item">
          Все
        </div>
        <div onClick={(e) => handleChange(e)} data-catagory="done" className="drop-down__item">
          Сделанные
        </div>
      </div>
    </motion.div>
  );
};

export default DropDown;