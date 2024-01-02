import React, { useState } from "react";
import service from "../../firebase/config";
function Notes() {
  const [post, setPost] = useState({ title: "", color: "", description: "" });
  const createNotes = async () => {
    try {
      service.createPost(post);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-5">
      <div className="p-6">
        <div>
          <label className="px-3 text-3xl">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="p-2 rounded-md w-96 bg-gray-800"
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
        </div>
        <div className="mt-5 mb-5 flex">
          <label className="px-3 text-3xl">Theme</label>
          <input
            type="color"
            placeholder="color"
            className="p-2 rounded-md bg-red-300 text-white"
            onChange={(e) => {
              setPost({ ...post, color: e.target.value });
            }}
          />
          <p className="px-3">(select the color)</p>
        </div>
        <label className="px-3 text-3xl"> description</label>
        <div>
          <textarea
            className="p-2 md:ml-10 mt-5 h-[30vw] rounded-md w-96 md:w-[50vw] text-white bg-gray-800 "
            onChange={(e) => {
              setPost({ ...post, description: e.target.value });
            }}
          ></textarea>
        </div>
      </div>
      <button
        className="p-3 bg-blue-800 rounded-md mx-10 my-6"
        onClick={createNotes}
      >
        Save
      </button>
    </div>
  );
}

export default Notes;
