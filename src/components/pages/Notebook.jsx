import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../firebase/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function Notebook() {
  const userStatus = useSelector((state) => state.status);

  const [notes, setNotes] = useState("");
  const [keypoints, setKeyPoints] = useState("");
  const { notesId } = useParams();
  const [notesInfo, setNotesInfo] = useState();
  const navigate = useNavigate();

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
        toast.error("Notes are empty");
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
      toast.error("Notes are empty");
    }
  };

  const deleteNotes = async () => {
    if (confirm("Are you sure?")) {
      const deleteNotes = await service.deleteNotes(notesId);
      if (deleteNotes) {
        navigate("/");
      }
    }
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"], // remove formatting button
    ],
  };

  const formats = [
    "font",
    "header",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <div className="p-8 font-petch ">
      <Toaster />
      <h1 className="text-4xl font-bold text-center mb-8">Your Notebook</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1
          className="my-4 text-2xl md:text-5xl font-poppins"
          style={{ color: notesInfo?.color }}
        >
          {notesInfo?.title}
        </h1>
        <p className="my-4 text-green-400">{notesInfo?.date}</p>
      </div>
      <div
        className="w-full p-6 rounded-lg border-2"
        style={{ borderColor: notesInfo?.color }}
      >
        <p className="text-lg">{notesInfo?.description}</p>
      </div>
      {userStatus && (
        <div className="flex justify-between mt-8">
          <div>
            <button
              className="px-4 py-2 mr-4 rounded-lg bg-red-500 text-white hover:bg-red-700 transition duration-300"
              onClick={deleteNotes}
              disabled={!userStatus}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
              onClick={handleSave}
              disabled={!userStatus}
            >
              Save
            </button>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700 transition duration-300"
            onClick={handleSaveToDevice}
          >
            Download Notes
          </button>
        </div>
      )}
      <div className="w-full  mt-10">
        <div
          className=" px-5 py-4 mb-10 text-xl"
          style={{
            backgroundColor: `${notesInfo?.color}90`,
          }}
        >
          <h1 className="text-2xl mb-4">Key Points</h1>
          <ReactQuill
            theme="snow"
            value={keypoints}
            onChange={setKeyPoints}
            className="rounded-lg border border-gray-900"
            style={{
              color: notesInfo?.color,
              backgroundColor: "#d0d0d0",
              padding: "10px",
              minHeight: "200px",
            }}
            spellCheck={false}
            readOnly={!userStatus}
            modules={modules}
            formats={formats}
          />
        </div>
        <div
          className=" mt-10 lg:mt-0 lg:ml-8 p-5 rounded-lg shadow-lg"
          style={{
            backgroundColor: `${notesInfo?.color}90`,
          }}
        >
          <h1 className="text-2xl mb-4">Welcome back, scribe..!</h1>

          <ReactQuill
            theme="snow"
            value={notes}
            onChange={setNotes}
            className="rounded-lg border border-gray-300"
            style={{
              color: notesInfo?.color,
              padding: "10px",
              backgroundColor: "#d0d0d0",
              minHeight: "200px",
            }}
            spellCheck={false}
            readOnly={!userStatus}
            modules={modules}
            formats={formats}
            ref={(el) => (quillRef = el)}
          />
        </div>
      </div>
    </div>
  );
}

export default Notebook;
