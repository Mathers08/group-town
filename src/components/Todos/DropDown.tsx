import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import "./Todos.scss";

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
    <motion.div whileTap={{ scale: .9 }} className="dropDown">
      <button onClick={handleOpen} className="dropDown__change">
        {all ? 'Все' : 'Сделанные'} <span>▼</span>
      </button>
      <div className={`item-container ${isOpen && 'show'}`}>
        <div onClick={(e) => handleChange(e)} data-catagory="all" className="dropDown__item">
          Все
        </div>
        <div onClick={(e) => handleChange(e)} data-catagory="done" className="dropDown__item">
          Сделанные
        </div>
      </div>
    </motion.div>
  );
};

export default DropDown;