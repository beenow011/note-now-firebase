import React from "react";
import { useNavigate } from "react-router-dom";

function CreateLib() {
  const navigate = useNavigate();
  return (
    <div
      className="w-80 md:w-96 min-h-36 rounded-md mx-auto bg-gray-700 m-8  p-6 my-auto hover:bg-gray-900 flex "
      onClick={() => {
        navigate("/library");
      }}
    >
      <span className="material-symbols-outlined ">add</span>{" "}
      <span className="ml-2">create new Library</span>
    </div>
  );
}

export default CreateLib;
