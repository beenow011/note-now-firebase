import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import service from "../../firebase/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Toaster, toast } from "react-hot-toast";

function Notebook() {
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
      if (notes || keypoints) {
        const updatedNotes = await service.updateNotes(notesId, {
          notes,
          keypoints,
        });
        toast.success("Notes saved!");
      } else {
        toast.error("notes is empty");
      }
    } catch (error) {
      console.log(error);
    }
  };
  let quillRef;
  const handleSaveToDevice = () => {
    if (notes || keypoints) {
      const plainText = quillRef?.getEditor().getText();
      const blob = new Blob([plainText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my_document.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      toast.error("notes is empty");
    }
  };
  return (
    <div className="p-8">
      <div>
        <Toaster />
      </div>
      <h1 className="text-3xl font-bold">Your Notebook</h1>
      <div className="flex justify-between w-full flex-wrap">
        <h1
          className="my-4 md:m-4 md:p-6 text-2xl md:text-5xl"
          style={{ color: notesInfo?.color }}
        >
          {notesInfo?.title}
        </h1>
        <p className=" my-4 md:m-4 md:p-6 text-green-400">{notesInfo?.date}</p>
      </div>
      <div
        className="w-full p-6  rounded-md"
        style={{ backgroundColor: notesInfo?.color }}
      >
        {notesInfo?.description}
      </div>
      <div className="flex justify-between">
        <button
          className="p-3 my-8 mx-4 rounded-md hover:shadow-white shadow"
          style={{ backgroundColor: notesInfo?.color }}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="p-3 my-8 mx-4 rounded-md hover:shadow-white shadow"
          style={{ backgroundColor: notesInfo?.color }}
          onClick={handleSaveToDevice}
        >
          download notes
        </button>
      </div>
      <div className="w-full  lg:flex ">
        <div className="lg:w-1/4 px-5 py-2 text-xl ">
          {" "}
          <h1 className="text-2xl">key notes..!</h1>
          <ReactQuill
            theme="snow"
            value={keypoints}
            onChange={setKeyPoints}
            className="rounded-md"
            style={{ color: notesInfo?.color }}
          />
        </div>
        <div className="lg:w-3/4  px-5 py-2">
          <h1 className="text-2xl">Welcome back scribe..!</h1>
          <ReactQuill
            theme="snow"
            value={notes}
            onChange={setNotes}
            className=" "
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
            ref={(el) => (quillRef = el)}
          />
        </div>
      </div>
    </div>
  );
}

export default Notebook;
