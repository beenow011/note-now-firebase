import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ title = "", notes = "", date, color, id }) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-80 md:w-96 min-h-36 rounded-lg mx-auto m-8 p-6 border-2 border-transparent shadow-lg transition-transform transform hover:scale-105 hover:border-white`}
      style={{
        backgroundImage: `linear-gradient(to bottom left, #ffe5b4, ${color})`, // Using a soft peach color as the starting color
      }}
      onClick={() => navigate(`/notebook/${id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-gray-800 font-poppins truncate">
          {title}
        </h1>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-petch h-16 overflow-hidden">
          {notes.length > 50 ? `${notes.substring(0, 50)}...` : notes}
        </p>
      </div>
    </div>
  );
}

export default Card;
