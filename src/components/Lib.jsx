import React, { useEffect, useState } from "react";
import service from "../firebase/config";
import LibCard from "./LibCard";
import { useSelector } from "react-redux";
import { notes } from "../notes";

function Lib() {
  const [lib, setLib] = useState({ libName: "", notesId: [] });
  const [allNotes, setAllNotes] = useState([]);
  const [postId, setPostid] = useState([]);
  const [checkedNotes, setCheckedNotes] = useState([]);
  const userId = useSelector((state) => state.userData);

  const handleSubmt = async () => {
    try {
      if (lib.libName.length > 0 && lib.notesId.length > 0) {
        const res = await service.createLib(userId, lib);
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    service
      .getAllPosts()
      .then(
        (Posts) =>
          Posts.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            if (data.uId === userId) {
              setAllNotes((prevAllPosts) => [...prevAllPosts, data]);
              setPostid((prev) => [...prev, id]);
            }
          })
        // console.log(Posts)
      )
      .catch((error) => console.log(error));
  }, []);
  const handleCheckboxChange = (index) => {
    const newCheckedNotes = [...checkedNotes];
    newCheckedNotes[index] = !newCheckedNotes[index];
    setCheckedNotes(newCheckedNotes);
    if (!checkedNotes[index]) {
      setLib((prevLib) => {
        const newNotesId = [{ id: postId[index] }, ...prevLib.notesId];
        return { ...prevLib, notesId: newNotesId };
      });
    }
    // You can perform additional actions based on the checkbox state here
  };
  console.log(lib);
  return (
    <div>
      <h1 className="text-4xl p-4">New Library</h1>
      <div className="flex justify-center items-center">
        <label className="text-2xl">Library Name:</label>
        <input
          type="text"
          className="p-3 rounded-md text-black w-96 "
          onChange={(e) => setLib({ ...lib, libName: e.target.value })}
        />
        <button
          className="m-10 bg-blue-500 p-3 hover:bg-blue-800"
          onClick={handleSubmt}
        >
          Create
        </button>
      </div>
      <ul>
        {allNotes?.map((note, i) => (
          <li key={i} className="border flex justify-between p-10 m-10">
            {/* <LibCard
              title={note.title}
              notes={note.description}
              date={note.date}
              id={postId[i]}
            /> */}
            <div>
              <h1>{note.title}</h1>
              {note.date}
            </div>
            <input
              type="checkbox"
              name=""
              id=""
              className="h-10 w-10"
              checked={checkedNotes[i] || false}
              onChange={() => handleCheckboxChange(i)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lib;
