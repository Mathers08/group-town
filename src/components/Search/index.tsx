import React, { ChangeEvent, useRef } from 'react';
import './Search.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/filter/selectors";
import { setSearchValue } from "../../redux/filter/slice";

const Search = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useSelector(selectFilter);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetSearchValue = () => {
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setSearchValue(e.target.value));

  return (
    <div className="search">
      <div className="search__icon-search">
        <SearchIcon/>
      </div>
      <input
        type="text"
        ref={inputRef}
        value={searchValue}
        onChange={onInputChange}
        placeholder="Поиск"
        className="search__input"
      />
      {searchValue &&
        <div className="search__icon-close" onClick={resetSearchValue}>
          <CloseIcon/>
        </div>
      }
    </div>
  );
};

export default Search;