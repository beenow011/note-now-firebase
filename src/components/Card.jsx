import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ title, notes, date, color, id }) {
  const navigate = useNavigate();
  // console.log(id);
  return (
    <div
      className={`w-80 md:w-96 min-h-36 rounded-md mx-auto border-2 border-black m-8 p-6 hover:border-white bg-[${color}]`}
      style={{ background: color }}
      onMouseEnter={{ background: "bg-gray-100" }}
      onClick={() => navigate(`/notebook/${id}`)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl overflow-hidden">{title}</h1>
        <p className="m-auto text-green-400">{date}</p>
      </div>
      <div className="mt-10">
        <p>{notes > 50 ? notes.subString(0, 50) : notes}.....</p>
      </div>
    </div>
  );
}

export default Card;
