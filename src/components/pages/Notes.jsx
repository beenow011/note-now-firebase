import React, { useState } from "react";
import service from "../../firebase/config";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Notes() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [post, setPost] = useState({ title: "", color: "", description: "" });
  const [activeColor, setActiveColor] = useState(null);
  // const [postId, setPostId] = useState("");
  const uId = useSelector((state) => state.userData);
  // const uId = userData?.user?.uid;
  // console.log(uId);
  const createNotes = async () => {
    try {
      if (post.color && post.title && post.description) {
        const postCreated = await service.createPost(uId, post);
        postCreated && console.log(postCreated);
        if (postCreated) {
          // console.log("post", postCreated?._key?.path?.segments[1]);
          const postId = postCreated?._key?.path?.segments[1];
          // console.log(postId);
          toast.success("Notebook created");
          navigate(`/notebook/${postId}`);
        }
      } else {
        setError("Every field is required*");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const colors = [
    {
      color: "blue",
      code: "#525CEB",
    },
    {
      color: "yellow",
      code: "#dea82b",
    },
    {
      color: "red",
      code: "#ff0400",
    },
    {
      color: "green",
      code: "#09d32d",
    },
    {
      color: "orange",
      code: "#e76218",
    },
  ];
  // console.log(post);
  return (
    <div className="p-5 md:flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full md:w-4/5 animate-fadeIn">
        <Toaster />

        <div className="mb-4">
          <label className="text-3xl text-white font-semibold">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="p-3 mt-2 rounded-md w-full bg-gray-700 text-white placeholder-gray-400 transition-transform transform hover:scale-105"
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="text-3xl text-white font-semibold">Theme</label>
          <p className="text-white">Select the color</p>
          <div className="flex flex-wrap mt-2">
            {colors.map((color) => (
              <div
                key={color.color}
                style={{ backgroundColor: color.code }}
                className={`p-4 m-2 rounded-md cursor-pointer border-2 ${
                  activeColor?.code === color.code
                    ? "border-white"
                    : "border-transparent"
                } transition-transform transform hover:scale-105`}
                onClick={() => {
                  setActiveColor(color);
                  setPost({ ...post, color: color.code });
                }}
              >
                {color.color}
              </div>
            ))}
          </div>
          <p className="mt-2 text-white">Selected color</p>
          <div
            className="p-4 mt-2 rounded-md"
            style={{ backgroundColor: activeColor?.code }}
          >
            {activeColor?.color}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-3xl text-white font-semibold">
            Description
          </label>
          <textarea
            className="p-3 mt-2 rounded-md w-full h-40 bg-gray-700 text-white placeholder-gray-400 transition-transform transform hover:scale-105"
            placeholder="Description"
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          ></textarea>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={createNotes}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Notes;
