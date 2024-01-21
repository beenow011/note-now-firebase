import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ title = "", notes = "", date, color, id }) {
  const navigate = useNavigate();
  // console.log(id);
  return (
    <div
      className={`w-80 md:w-96 min-h-36 rounded-md mx-auto border-2 border-black m-8 p-6  hover:border-white bg-[${color}]`}
      style={{
        backgroundImage: `linear-gradient(to bottom left, gray, ${color})`,
      }}
      onClick={() => navigate(`/notebook/${id}`)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl overflow-hidden font-poppins">{title}</h1>
        <p className=" text-black">{date}</p>
      </div>
      <div className="mt-10">
        <p className=" h-10 font-petch">
          {notes.length > 50 ? `${notes.substring(0, 50)}...` : notes}
        </p>
      </div>
    </div>
  );
}

export default Card;
