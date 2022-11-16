import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import './DropDown.scss';
import { useSelector } from 'react-redux';
import { setCategoryId } from '../../redux/filter/slice';
import { selectFilter } from '../../redux/filter/selectors';
import { useAppDispatch } from "../../hooks";

type PopupClick = MouseEvent & {
  path: Node[]
}

interface DropDownProps {
  filterItems: string[];
  filteredResult: (v: string) => void;
}

const DropDown: FC<DropDownProps> = memo(({ filterItems, filteredResult }) => {
  const dispatch = useAppDispatch();
  const filterRef = useRef<HTMLDivElement>(null);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const { categoryId } = useSelector(selectFilter);

  const toggleVisiblePopup = () => setVisiblePopup(!visiblePopup);
  const onCategoryClick = useCallback((id: number) => {
    dispatch(setCategoryId(id));
    filteredResult(filterItems[id]);
    setVisiblePopup(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const _event = e as PopupClick;
      if (filterRef.current && !_event.path.includes(filterRef.current)) {
        setVisiblePopup(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div ref={filterRef} className="sort">
      <div className="sort__label">
        <svg className={visiblePopup ? "rotated" : ""} width="10" height="6" viewBox="0 0 10 6" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"/>
        </svg>
        <div onClick={toggleVisiblePopup}>
          <b>Фильтрация:</b>
          <span>{filterItems[categoryId]}</span>
        </div>
      </div>
      {visiblePopup && <div className="sort__popup">
        <ul>
          {filterItems.map((item, index) => (
            <li key={`${item}_${index}`}
                className={categoryId === index ? 'active' : ''}
                onClick={() => onCategoryClick(index)}>
              {item}
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
});

export default DropDown;