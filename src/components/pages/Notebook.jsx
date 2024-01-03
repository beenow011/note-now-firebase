import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import service from "../../firebase/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Toaster, toast } from "react-hot-toast";

function Notebook() {
  const [change, setChange] = useState(false);
  const [notes, setNotes] = useState("");
  const [keypoints, setKeyPoints] = useState("");
  const { notesId } = useParams();
  const [notesInfo, setNotesInfo] = useState();
  useEffect(() => {
    service
      .getAllPosts()
      .then((posts) => {
        posts.forEach((doc) => {
          if (notesId === doc.id) {
            setNotesInfo(doc.data());
          }
        });
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    if (notesInfo) {
      setNotes(notesInfo?.notes);
      setKeyPoints(notesInfo?.keypoints);
    }
  }, [notesInfo]);

  const handleSave = async () => {
    try {
      const updatedNotes = await service.updateNotes(notesId, {
        notes,
        keypoints,
      });
      toast.success("Notes saved!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <div>
        <Toaster />
      </div>
      <h1 className="text-3xl font-bold">Your Notebook</h1>
      <div className="flex justify-between">
        <h1 className="m-4 p-6 text-5xl" style={{ color: notesInfo?.color }}>
          {notesInfo?.title}
        </h1>
        <p className="m-4 p-6 text-green-400">{notesInfo?.date}</p>
      </div>
      <div
        className="w-full p-6  rounded-md"
        style={{ backgroundColor: notesInfo?.color }}
      >
        {notesInfo?.description}
      </div>
      <button
        className="p-3 my-8 mx-4 rounded-md hover:border"
        style={{ backgroundColor: notesInfo?.color }}
        onClick={handleSave}
      >
        Save
      </button>
      <div className="w-full  lg:flex ">
        <div className="lg:w-3/4  p-5">
          <h1 className="text-2xl">Welcome back scribe..!</h1>
          <ReactQuill
            theme="snow"
            value={notes}
            onChange={setNotes}
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
            value={keypoints}
            onChange={setKeyPoints}
            className="rounded-md"
            style={{ color: notes?.color }}
          />
        </div>
      </div>
    </div>
  );
}

export default Notebook;
