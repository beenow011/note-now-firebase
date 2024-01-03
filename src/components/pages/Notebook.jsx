import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import service from "../../firebase/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Notebook() {
  const [value, setValue] = useState("");
  const [keyNotes, setKeyNotes] = useState("");
  const { notesId } = useParams();
  const [notes, setNotes] = useState();
  useEffect(() => {
    service
      .getAllPosts()
      .then((posts) => {
        posts.forEach((doc) => {
          if (notesId === doc.id) {
            setNotes(doc.data());
          }
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Your Notebook</h1>
      <div className="flex justify-between">
        <h1 className="m-4 p-6 text-5xl" style={{ color: notes?.color }}>
          {notes?.title}
        </h1>
        <p className="m-4 p-6 text-green-400">{notes?.date}</p>
      </div>
      <div
        className="w-full p-6  rounded-md"
        style={{ backgroundColor: notes?.color }}
      >
        {notes?.description}
      </div>
      <div className="w-full  lg:flex mt-4">
        <div className="lg:w-3/4  p-5">
          <h1 className="text-2xl">Welcome back scribe..!</h1>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className=" "
            style={{ color: notes?.color }}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
          />
        </div>
        <div className="lg:w-1/4 p-5 text-xl ">
          {" "}
          <h1 className="text-2xl">key notes..!</h1>
          <ReactQuill
            theme="snow"
            value={keyNotes}
            onChange={setKeyNotes}
            className="rounded-md"
            style={{ color: notes?.color }}
          />
        </div>
      </div>
    </div>
  );
}

export default Notebook;
