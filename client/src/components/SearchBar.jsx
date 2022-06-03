import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
    // console.log(name)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(name));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search.."
        onChange={(e) => handleInput(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Go
      </button>
    </div>
  );
}
//cuando busco argentina no me trae nada (error 304)
