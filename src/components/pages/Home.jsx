import React, { useEffect, useState } from "react";
import { notes } from "../../notes";
import { Card, CreateNotes } from "..";
import Banner from "../Banner";
import service from "../../firebase/config";
// import Card from "../Card";
function Home() {
  // console.log(notes);
  const [allPosts, setAllPosts] = useState([]);
  const [postId, setPostid] = useState([]);
  useEffect(() => {
    service
      .getAllPosts()
      .then(
        (Posts) =>
          Posts.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            setAllPosts((prevAllPosts) => [...prevAllPosts, data]);
            setPostid((prev) => [...prev, id]);
          })
        // console.log(Posts)
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Banner />
      <div className="p-5">
        <h1 className="text-3xl font-bold px-5">Scribe your learning</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          <CreateNotes />
          {allPosts?.map((note, i) => (
            <Card
              title={note.title}
              notes={note.description}
              date={note.date}
              color={note.color}
              key={i}
              id={postId[i]}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
