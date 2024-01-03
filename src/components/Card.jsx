import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ title, notes, date, color, id }) {
  const navigate = useNavigate();
  // console.log(id);
  return (
    <div
      className={`w-96 min-h-36 rounded-md border border-[${color}] m-8 p-6 hover:bg-gray-800 bg-[${color}]`}
      style={{ borderColor: color }}
      onClick={() => navigate(`/notebook/${id}`)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl ">{title}</h1>
        <p className="m-auto text-green-400">{date}</p>
      </div>
      <div className="mt-10">
        <p>{notes > 50 ? notes.subString(0, 50) : notes}.....</p>
      </div>
    </div>
  );
}

export default Card;
