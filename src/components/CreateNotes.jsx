import React from "react";
import { useNavigate } from "react-router-dom";

function CreateNotes() {
  const navigate = useNavigate();
  return (
    <div
      className="w-96 min-h-36 rounded-md bg-gray-700 m-8 p-6 my-auto hover:bg-gray-900 flex "
      onClick={() => {
        navigate("/notes");
      }}
    >
      <span className="material-symbols-outlined ">add</span>{" "}
      <span className="ml-2">create new notes</span>
    </div>
  );
}

export default CreateNotes;
