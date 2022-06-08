import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";
import "./search.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(inputRef.current.value));
    inputRef.current.value = "";
  };

  return (
    <div className="search_bar">
      <input ref={inputRef} type="text" placeholder="Search.." />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Go
      </button>
    </div>
  );
}
