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
    <div className="p-5 md:flex justify-center">
      <div>
        <Toaster />
      </div>
      <div className="p-6 ">
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
        <div className="mt-5 mb-5 ">
          <label className="px-3 text-3xl">Theme</label>
          {/* <input
            type="color"
            placeholder="color"
            className="p-2 rounded-md bg-red-300 text-white"
            onChange={(e) => {
              setPost({ ...post, color: e.target.value });
            }}
          /> */}
          <p className="px-3">(select the color)</p>
          <div className="flex flex-wrap">
            {colors.map((color) => (
              <div
                style={{ backgroundColor: color.code }}
                className={`p-3 m-2 rounded-md border-2 border-${activeColor} cursor-pointer`}
                onClick={() => {
                  setActiveColor(color);
                  setPost({ ...post, color: color.code });
                }}
              >
                {color.color}
              </div>
            ))}
          </div>
          <p>Selected color</p>
          <div
            className="p-3 m-2 rounded-md  cursor-pointer"
            style={{ backgroundColor: activeColor?.code }}
          >
            {activeColor?.color}
          </div>
        </div>
        <label className="px-3 text-3xl"> description</label>
        <div>
          <textarea
            className="p-2 md:ml-10 mt-5 h-[30vw] rounded-md w-80 md:w-[50vw] text-white bg-gray-800 "
            onChange={(e) => {
              setPost({ ...post, description: e.target.value });
            }}
          ></textarea>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <button
        className="p-3 h-16 bg-blue-800 rounded-lg mx-10 my-6 hover:bg-blue-900"
        onClick={createNotes}
      >
        Save
      </button>
    </div>
  );
}

export default Notes;
