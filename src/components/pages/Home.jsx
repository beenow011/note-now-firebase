import React from "react";
import { notes } from "../../notes";
import { Card, CreateNotes } from "..";
import Banner from "../Banner";
// import Card from "../Card";
function Home() {
  // console.log(notes);
  return (
    <>
      <Banner />
      <div className="p-5">
        <h1 className="text-3xl font-bold px-5">Scribe your learning</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
          <CreateNotes />
          {notes.map((note, i) => (
            <Card
              title={note.title}
              notes={note.notes}
              date={note.date}
              color={note.color}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
