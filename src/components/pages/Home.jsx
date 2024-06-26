import React, { useEffect, useState } from "react";
import { notes } from "../../notes";
import { Card, CreateNotes } from "..";
import Banner from "../Banner";
import service from "../../firebase/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.png";

// import Card from "../Card";
function Home() {
  // console.log(notes);
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [SearchPosts, setSearchPosts] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notesAndId, setNotesAndId] = useState([{}]);
  const [sortedArray, setSortedArray] = useState({});
  const [postId, setPostid] = useState([]);
  const userStatus = useSelector((state) => state.status);
  const userId = useSelector((state) => state.userData);
  useEffect(() => {
    service
      .getAllPosts()
      .then(
        (Posts) =>
          Posts.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            if (data.uId === userId) {
              setNotesAndId((prev) => [...prev, { notes: data, id: id }]);
            }
          })
        // console.log(Posts)
      )
      .catch((error) => console.log(error));
  }, []);
  console.log(notesAndId);
  useEffect(() => {
    // setAllPosts(allPosts);
    setSearchPosts(notesAndId);
    const filteredData = notesAndId.filter(
      (post) =>
        post.notes?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.notes?.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        post.notes?.keypoints.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchPosts(filteredData);
  }, [searchTerm, notesAndId]);
  // console.log(SearchPosts);

  // console.log(allPosts);
  useEffect(() => {
    setSortedArray(
      SearchPosts?.sort((a, b) => {
        const dateA = new Date(a.notes?.date);
        const dateB = new Date(b.notes?.date);

        return dateB - dateA;
      })
    );
  }, [SearchPosts]);

  // console.log("sorted", sortedArray);

  return userStatus ? (
    <>
      <Banner />
      <div className="p-5">
        <h1 className="text-3xl font-bold px-5">Scribe your learning</h1>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 md:w-96 p-1 md:p-2 m-3 z-10 ml-6 text-black mx-auto"
          />
        </div>
        <div className="flex flex-wrap justify-start justify-items-start mt-4 ">
          <CreateNotes />
          {SearchPosts?.map((note, i) => (
            <Card
              title={note.notes?.title}
              notes={note.notes?.description}
              date={note.notes?.date}
              color={note.notes?.color}
              key={i}
              id={note.id}
            />
          ))}
        </div>
      </div>
    </>
  ) : (
    <div>
      {" "}
      <div className=" m-3 bg-gradient-to-r from-[#444772] via-[#474f99] to-[#5974ec] rounded-md p-6 flex my-8 justify-between">
        <div>
          <h1 className="text-start text-[#50aaa3] p-3 text-3xl font-bold font-mono">
            Hello scribe..!
          </h1>
          <p className="text-start p-3 text-lg font-bold text-white font-mono">
            Start Scribbling Success - Note Now Your Key to Mastery!"
            <br></br> Let's Begin Your Journey!
          </p>
          <div className="flex gap-5 p-4">
            <button
              className="p-2 border rounded-md hover:bg-blue-400/50"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="p-2 border rounded-md hover:bg-blue-400/50"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
        <img src={bg} alt="" width={400} className="hidden md:block" />
      </div>
    </div>
  );
}

export default Home;
